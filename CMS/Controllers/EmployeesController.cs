using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using CMS.Models;
using CMS.Dtos;
using Microsoft.AspNetCore.Authorization;
namespace CMS.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class EmployeesController : ControllerBase
    {
        private readonly CMSContext _context;

        public EmployeesController(CMSContext context)
        {
            _context = context;
        }

        // GET: api/Employees 
        [HttpGet]
        public async Task<ActionResult<IEnumerable<Employee>>> GetEmployees()
        {
            return await _context.Employees.ToListAsync();
        }

        [HttpGet("{refreshtoken}")]
        public async Task<IActionResult> GetEmployeeById(string refreshtoken)
        {
            var employee = await _context.RefreshTokens
                .Where(rt => rt.Token == refreshtoken)
                .Select(rt => rt.Employee)
                .FirstOrDefaultAsync();
            if (employee == null)
            {
                return NotFound(new { message = "Employee not found." });
            }

            // DTO-ba mapeljük az adatokat
            var employeeDto = new EmployeeGetIdDto
            {
                FirstName = employee.FirstName,
                LastName = employee.LastName,
                Role = employee.Role,
                Username = employee.Username,
            };

            return Ok(employeeDto); // 200 OK és a keresett adat
        }


        // PUT: api/Employees/5
        // To protect from overposting attacks, see https://go.microsoft.com/fwlink/?linkid=2123754
        [HttpPut("{id}")]
        public async Task<ActionResult<Employee>> UpdateEmployee(int id, [FromBody] EmployeePutDto EmployeePutDto)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState); // Ha a DTO validációs hibát dob, itt visszaküldjük
            }

            var employee = await _context.Employees.FindAsync(id);
            if (employee == null)
            {
                return NotFound(new { message = "Employee not found." });
            }

            // DTO alapján frissítés
            employee.FirstName = EmployeePutDto.FirstName;
            employee.LastName = EmployeePutDto.LastName;

            _context.Employees.Update(employee);
            await _context.SaveChangesAsync();

            return Ok(new {message ="Employee was sucessfully updated."}); // 200 - sikeres frissítés, de nincs visszatérő adat
        }


        // POST: api/Employees
        // To protect from overposting attacks, see https://go.microsoft.com/fwlink/?linkid=2123754
       



        private bool EmployeeExists(int id)
        {
            return _context.Employees.Any(e => e.EmployeeId == id);
        }
    }
}
