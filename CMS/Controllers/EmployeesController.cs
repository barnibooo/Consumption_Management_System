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

        // GET: api/Employees/5
        [HttpGet("{id}")]
        public async Task<ActionResult<Employee>> GetEmployee(int id)
        {
            var employee = await _context.Employees.FindAsync(id);

            if (employee == null)
            {
                return NotFound();
            }

            return employee;
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
        public async Task<ActionResult<Employee>> PostEmployee(Employee employee)
        {
            _context.Employees.Add(employee);
            await _context.SaveChangesAsync();

            return CreatedAtAction("GetEmployee", new { id = employee.EmployeeId }, employee);
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
