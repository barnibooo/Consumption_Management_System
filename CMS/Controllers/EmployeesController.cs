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
       
        [HttpGet("roles")]
        [Authorize(Policy = "AdminOnly")]
        public async Task<ActionResult<IEnumerable<string>>> GetRoles()
        {
            var roles = await _context.Employees
                .Select(e => e.Role)
                .Distinct()
                .ToListAsync();

            return Ok(roles);
        }
       
        private bool EmployeeExists(int id)
        {
            return _context.Employees.Any(e => e.EmployeeId == id);
        }
    }
}
