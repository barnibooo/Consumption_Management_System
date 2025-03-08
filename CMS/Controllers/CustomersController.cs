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
    public class CustomersController : ControllerBase
    {
        private readonly CMSContext _context;

        public CustomersController(CMSContext context)
        {
            _context = context;
        }

        // GET: api/Customers
        [HttpGet]
        public async Task<ActionResult<IEnumerable<CustomerGetDto>>> GetCustomers()
        {
            var customers = await _context.Customers
                .Include(c => c.CustomerTickets)
                .ThenInclude(ct => ct.Tickets)
                .ToListAsync();

            var customerDtos = customers.Select(customer => new CustomerGetDto
            {
                CardId = customer.CardId,
                Name = customer.Name,
                CreatedAt = customer.CreatedAt,
                CreatedBy = customer.CreatedBy,
                Tickets = customer.CustomerTickets.Select(ct => new CustomerTicketsDto
                {
                    TicketName = ct.Tickets.TicketName // Map the ticket name
                }).ToList()
            }).ToList();

            return customerDtos;
        }


        // GET: api/Customers/5
        [HttpGet("{id}")]
        public async Task<ActionResult<Customer>> GetCustomer(int id)
        {
            var customer = await _context.Customers.FindAsync(id);

            if (customer == null)
            {
                return NotFound();
            }

            return customer;
        }

        // PUT: api/Customers/5
        // To protect from overposting attacks, see https://go.microsoft.com/fwlink/?linkid=2123754
        [HttpPut("{id}")]
        public async Task<IActionResult> PutCustomer(int id, Customer customer)
        {
            if (id != customer.CustomerId)
            {
                return BadRequest();
            }

            _context.Entry(customer).State = EntityState.Modified;

            try
            {
                await _context.SaveChangesAsync();
            }
            catch (DbUpdateConcurrencyException)
            {
                if (!CustomerExists(id))
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


        [HttpPost]
        public async Task<IActionResult> CreateOrder([FromBody] CustomerPostDto customerpostdto)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }

            var existingCustomer = await _context.Customers
                .FirstOrDefaultAsync(c => c.CardId == customerpostdto.CardId && c.IsActive);

            if (existingCustomer != null)
            {
                return BadRequest(new { message = "A customer with the same CardId and IsActive = true already exists." });
            }

            var customer = new Customer
            {
                CardId = customerpostdto.CardId,
                Name = customerpostdto.Name,
                CreatedAt = DateTime.Now,
                IsActive = true,
                CustomerTickets = new List<CustomerTicket>()
            };

            foreach (var item in customerpostdto.TicketsIds)
            {
                var ticket = await _context.Tickets.FindAsync(item.TicketId);
                if (ticket != null)
                {
                    var customerTicket = new CustomerTicket
                    {
                        TicketId = item.TicketId
                    };
                    customer.CustomerTickets.Add(customerTicket);
                }
            }

            _context.Customers.Add(customer);
            await _context.SaveChangesAsync();
            return Ok(new { message = "Customer created successfully." });
        }


        private bool CustomerExists(int id)
        {
            return _context.Customers.Any(e => e.CustomerId == id);
        }
    }
}
