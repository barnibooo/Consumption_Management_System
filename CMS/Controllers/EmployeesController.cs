using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using CMS.Model;
using CMS.Dtos;

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

        [HttpGet("{id}")]
        public async Task<IActionResult> GetEmployeeById(int id)
        {
            var employee = await _context.Employees.FindAsync(id);
            if (employee == null)
            {
                return NotFound(new { message = "Employee not found." });
            }

            // DTO-ba mapeljük az adatokat
            var employeeDto = new EmployeeGetIdDto
            {
                FirstName = employee.FirstName,
                LastName = employee.LastName,
                Role = employee.Role
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
        [HttpPost]
        public async Task<IActionResult> CreateEmployee([FromBody] EmployeePostDto EmployeePostDto)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState); // 400-as válasz, ha a DTO nem érvényes
            }

            var employee = new Employee
            {
                FirstName = EmployeePostDto.FirstName,
                LastName = EmployeePostDto.LastName,
                Role = EmployeePostDto.Role,
                Username = EmployeePostDto.UserName,
                Password = EmployeePostDto.Password,
            };

            _context.Employees.Add(employee);
            await _context.SaveChangesAsync();

            return CreatedAtAction(nameof(GetEmployeeById), new { id = employee.EmployeeId }, new
            {
                message = "Employee created successfully.",
            });
        }


        // DELETE: api/Employees/5
        [HttpDelete("{id}")]
        public async Task<IActionResult> DeleteEmployee(int id)
        {
            var employee = await _context.Employees.FindAsync(id);
            if (employee == null)
            {
                return NotFound();
            }

            _context.Employees.Remove(employee);
            await _context.SaveChangesAsync();

            return NoContent();
        }

        private bool EmployeeExists(int id)
        {
            return _context.Employees.Any(e => e.EmployeeId == id);
        }
    }
}
