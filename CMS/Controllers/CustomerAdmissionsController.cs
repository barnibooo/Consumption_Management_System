using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using CMS.Model;

namespace CMS.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class CustomerAdmissionsController : ControllerBase
    {
        private readonly CMSContext _context;

        public CustomerAdmissionsController(CMSContext context)
        {
            _context = context;
        }

        // GET: api/CustomerAdmissions
        [HttpGet]
        public async Task<ActionResult<IEnumerable<CustomerAdmission>>> GetCustomerAdmissions()
        {
            return await _context.CustomerAdmissions.ToListAsync();
        }

        // GET: api/CustomerAdmissions/5
        [HttpGet("{id}")]
        public async Task<ActionResult<CustomerAdmission>> GetCustomerAdmission(int id)
        {
            var customerAdmission = await _context.CustomerAdmissions.FindAsync(id);

            if (customerAdmission == null)
            {
                return NotFound();
            }

            return customerAdmission;
        }

        // PUT: api/CustomerAdmissions/5
        // To protect from overposting attacks, see https://go.microsoft.com/fwlink/?linkid=2123754
        [HttpPut("{id}")]
        public async Task<IActionResult> PutCustomerAdmission(int id, CustomerAdmission customerAdmission)
        {
            if (id != customerAdmission.CustomerAdmissionId)
            {
                return BadRequest();
            }

            _context.Entry(customerAdmission).State = EntityState.Modified;

            try
            {
                await _context.SaveChangesAsync();
            }
            catch (DbUpdateConcurrencyException)
            {
                if (!CustomerAdmissionExists(id))
                {
                    return NotFound();
                }
                else
                {
                    throw;
                }
            }

            return NoContent();
        }

        // POST: api/CustomerAdmissions
        // To protect from overposting attacks, see https://go.microsoft.com/fwlink/?linkid=2123754
        [HttpPost]
        public async Task<ActionResult<CustomerAdmission>> PostCustomerAdmission(CustomerAdmission customerAdmission)
        {
            _context.CustomerAdmissions.Add(customerAdmission);
            await _context.SaveChangesAsync();

            return CreatedAtAction("GetCustomerAdmission", new { id = customerAdmission.CustomerAdmissionId }, customerAdmission);
        }

        // DELETE: api/CustomerAdmissions/5
        [HttpDelete("{id}")]
        public async Task<IActionResult> DeleteCustomerAdmission(int id)
        {
            var customerAdmission = await _context.CustomerAdmissions.FindAsync(id);
            if (customerAdmission == null)
            {
                return NotFound();
            }

            _context.CustomerAdmissions.Remove(customerAdmission);
            await _context.SaveChangesAsync();

            return NoContent();
        }

        private bool CustomerAdmissionExists(int id)
        {
            return _context.CustomerAdmissions.Any(e => e.CustomerAdmissionId == id);
        }
    }
}
