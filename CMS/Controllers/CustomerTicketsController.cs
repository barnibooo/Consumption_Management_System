using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using CMS.Models;
using CMS.Dtos;

namespace CMS.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class CustomerTicketsController : ControllerBase
    {
        private readonly CMSContext _context;

        public CustomerTicketsController(CMSContext context)
        {
            _context = context;
        }

        // GET: api/CustomerTickets
        /*
        [HttpGet]
        public async Task<ActionResult<IEnumerable<CustomerTicketGetDto>>> GetCustomerTickets()
        {
            return await _context.CustomerTickets
                .Select(ct => new CustomerTicketGetDto
                {
                    CustomerTicketId = ct.CustomerTicketId,
                    CustomerId = ct.CustomerId,
                    TicketId = ct.TicketId
                })
                .ToListAsync();
        }

        // GET: api/CustomerTickets/5
        [HttpGet("{id}")]
        public async Task<ActionResult<CustomerTicket>> GetCustomerTicket(int id)
        {
            var customerTicket = await _context.CustomerTickets.FindAsync(id);

            if (customerTicket == null)
            {
                return NotFound();
            }

            return customerTicket;
        }

        // PUT: api/CustomerTickets/5
        // To protect from overposting attacks, see https://go.microsoft.com/fwlink/?linkid=2123754
        [HttpPut("{id}")]
        public async Task<IActionResult> PutCustomerTicket(int id, CustomerTicket customerTicket)
        {
            if (id != customerTicket.CustomerTicketId)
            {
                return BadRequest();
            }

            _context.Entry(customerTicket).State = EntityState.Modified;

            try
            {
                await _context.SaveChangesAsync();
            }
            catch (DbUpdateConcurrencyException)
            {
                if (!CustomerTicketExists(id))
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

        // POST: api/CustomerTickets
        // To protect from overposting attacks, see https://go.microsoft.com/fwlink/?linkid=2123754
        [HttpPost]
        public async Task<ActionResult<CustomerTicket>> PostCustomerTicket(CustomerTicket customerTicket)
        {
            _context.CustomerTickets.Add(customerTicket);
            await _context.SaveChangesAsync();

            return CreatedAtAction("GetCustomerTicket", new { id = customerTicket.CustomerTicketId }, customerTicket);
        }

        // DELETE: api/CustomerTickets/5
        [HttpDelete("{id}")]
        public async Task<IActionResult> DeleteCustomerTicket(int id)
        {
            var customerTicket = await _context.CustomerTickets.FindAsync(id);
            if (customerTicket == null)
            {
                return NotFound();
            }

            _context.CustomerTickets.Remove(customerTicket);
            await _context.SaveChangesAsync();

            return NoContent();
        }

        private bool CustomerTicketExists(int id)
        {
            return _context.CustomerTickets.Any(e => e.CustomerTicketId == id);
        }*/
    }
}
