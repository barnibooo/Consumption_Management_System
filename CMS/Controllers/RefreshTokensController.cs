using CMS.Dtos;
using CMS.Models;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using Microsoft.IdentityModel.Tokens;
using System.IdentityModel.Tokens.Jwt;
using System.Security.Claims;
using System.Text;

[ApiController]
[Route("api/[controller]")]
public class AuthController : ControllerBase
{
    private readonly CMSContext _context;
    private readonly IConfiguration _configuration;

    public AuthController(CMSContext context, IConfiguration configuration)
    {
        _context = context;
        _configuration = configuration;
    }

    [HttpPost("register")]
    [Authorize(Policy = "AdminOnly")]
    public async Task<IActionResult> Register([FromBody] RegisterDto model)
    {
        if (await _context.Employees.AnyAsync(u => u.Username == model.Username))
            return BadRequest("User already exists.");

        var role = Enum.IsDefined(typeof(Roles), model.Role);
        if (!role)
            return BadRequest("Invalid role.");

        var currentUserRole = User.Claims.FirstOrDefault(c => c.Type == ClaimTypes.Role)?.Value;
        if (model.Role == Roles.Admin && currentUserRole != nameof(Roles.Admin))
            return Unauthorized("Only admins can register admin users.");

        var user = new Employee
        {
            Username = model.Username,
            PasswordHash = BCrypt.Net.BCrypt.HashPassword(model.Password),
            FirstName = model.FirstName,
            LastName = model.LastName,
            Role = model.Role.ToString(),
        };

        _context.Employees.Add(user);
        await _context.SaveChangesAsync();

        return Ok(new { message = "User registered successfully." });
    }

    [HttpPost("login")]
    public async Task<IActionResult> Login([FromBody] LoginDto model)
    {
        var user = await _context.Employees.SingleOrDefaultAsync(u => u.Username == model.UserName);

        if (user == null || !BCrypt.Net.BCrypt.Verify(model.Password, user.PasswordHash))
            return Unauthorized("Invalid credentials.");

        var token = GenerateJwtToken(user);
        var refreshToken = GenerateRefreshToken(user.EmployeeId);

        _context.RefreshTokens.Add(refreshToken);
        await _context.SaveChangesAsync();

        return Ok(new
        {
            Token = token,
            RefreshToken = refreshToken.Token
        });
    }
    [HttpPost("refreshToken")]
    //Védett, de nem az [Authorize]-zal.
    public async Task<IActionResult> RefreshToken()
    {
        var authHeader = Request.Headers["Authorization"].ToString();
        if (string.IsNullOrEmpty(authHeader) || !authHeader.StartsWith("Bearer "))
        {
            return Unauthorized("Authorization header is missing or invalid.");
        }

        var token = authHeader.Substring("Bearer ".Length).Trim();

        var refreshToken = await _context.RefreshTokens
            .Include(rt => rt.Employee)
            .SingleOrDefaultAsync(rt => rt.Token == token);

        if (refreshToken == null || refreshToken.Expires < DateTime.UtcNow)
        {
            return Unauthorized("Invalid or expired refresh token.");
        }

        var newToken = GenerateJwtToken(refreshToken.Employee);
        var newRefreshToken = GenerateRefreshToken(refreshToken.EmployeeId);

        _context.RefreshTokens.Remove(refreshToken);
        _context.RefreshTokens.Add(newRefreshToken);

        try
        {
            await _context.SaveChangesAsync();
        }
        catch (DbUpdateConcurrencyException)
        {
            if (!RefreshTokenExists(refreshToken.Token))
            {
                return NotFound("Refresh token not found.");
            }
            else
            {
                throw;
            }
        }

        return Ok(new
        {
            Token = newToken,
            RefreshToken = newRefreshToken.Token
        });
    }




    [HttpPost("Checktoken")]
    [Authorize]
    public IActionResult CheckToken()
    {
        var authHeader = Request.Headers["Authorization"].ToString();
        if (string.IsNullOrEmpty(authHeader) || !authHeader.StartsWith("Bearer "))
        {
            return Unauthorized("Authorization header is missing or invalid.");
        }

        var token = authHeader.Substring("Bearer ".Length).Trim();
        var tokenHandler = new JwtSecurityTokenHandler();
        var key = Encoding.ASCII.GetBytes(_configuration["Jwt:Key"]);

        try
        {
            tokenHandler.ValidateToken(token, new TokenValidationParameters
            {
                ValidateIssuer = true,
                ValidateAudience = true,
                ValidateLifetime = true,
                ValidateIssuerSigningKey = true,
                ValidIssuer = _configuration["Jwt:Issuer"],
                ValidAudience = _configuration["Jwt:Audience"],
                IssuerSigningKey = new SymmetricSecurityKey(key),
                ClockSkew = TimeSpan.Zero // Ensure no additional time is added to the token's expiration
            }, out SecurityToken validatedToken);
        }
        catch (SecurityTokenExpiredException)
        {
            return Unauthorized("Token has expired.");
        }
        catch (Exception)
        {
            return Unauthorized("Invalid token.");
        }

        return Ok(new { message = "Token is valid." });
    }



    [HttpPost("logout")]
    [Authorize]
    public async Task<IActionResult> Logout()
    {
        var authHeader = Request.Headers["Authorization"].ToString();
        if (string.IsNullOrEmpty(authHeader) || !authHeader.StartsWith("Bearer "))
        {
            return Unauthorized("Authorization header is missing or invalid.");
        }

        var token = authHeader.Substring("Bearer ".Length).Trim();

        var refreshToken = await _context.RefreshTokens.SingleOrDefaultAsync(rt => rt.Token == token);

        if (refreshToken != null)
        {
            _context.RefreshTokens.Remove(refreshToken);
            await _context.SaveChangesAsync();
        }

        return Ok(new { message = "Logged out successfully." });
    }



    private string GenerateJwtToken(Employee user)
    {
        var tokenHandler = new JwtSecurityTokenHandler();
        var key = Encoding.ASCII.GetBytes(_configuration["Jwt:Key"]);

        var tokenDescriptor = new SecurityTokenDescriptor
        {
            Subject = new ClaimsIdentity(new[]
            {
            new Claim(ClaimTypes.Name, user.Username),
            new Claim(ClaimTypes.Role, user.Role.ToString()),
            new Claim("EmployeeId", user.EmployeeId.ToString()),
            new Claim("FirstName", user.FirstName.ToString()),
            new Claim("LastName", user.LastName.ToString()),
            new Claim("Monogram", (user.LastName[0].ToString() + user.FirstName[0].ToString()).ToUpper())
        }),
            Expires = DateTime.UtcNow.AddMinutes(_configuration.GetValue<int>("Jwt:ExpireMinutes")),
            SigningCredentials = new SigningCredentials(new SymmetricSecurityKey(key), SecurityAlgorithms.HmacSha256Signature),
            Issuer = _configuration["Jwt:Issuer"],
            Audience = _configuration["Jwt:Audience"]
        };

        var token = tokenHandler.CreateToken(tokenDescriptor);

        return tokenHandler.WriteToken(token);
    }

    private RefreshToken GenerateRefreshToken(int userId)
    {
        return new RefreshToken
        {
            Token = Guid.NewGuid().ToString(),
            Expires = DateTime.UtcNow.AddHours(_configuration.GetValue<int>("Jwt:RefreshExpireHours")),
            EmployeeId = userId
        };
    }
    private bool RefreshTokenExists(string token)
    {
        return _context.RefreshTokens.Any(e => e.Token == token);
    }

}