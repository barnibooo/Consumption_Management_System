using System.IdentityModel.Tokens.Jwt;
using CMS.Models;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;

namespace CMS.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class PermissionController : ControllerBase
    {
        private readonly CMSContext _context;

        public PermissionController(CMSContext context)
        {
            _context = context;
        }

        [HttpPost("PostEmployeePermission")]
        public async Task<IActionResult> PostEmployeePermission()
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

            var employeeRole = refreshToken.Employee.Role;

            return Ok(new { Role = employeeRole });
        }
    }
}
