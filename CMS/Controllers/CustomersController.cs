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
        // GET: api/Customers
        [HttpGet]
        public async Task<ActionResult<IEnumerable<CustomerGetDto>>> GetCustomers()
        {
            var customers = await _context.Customers
                .Include(c => c.CustomerTickets)
                .ThenInclude(ct => ct.Tickets)
                .Include(c => c.CustomerAdmissions)
                .ThenInclude(ca => ca.Admissions)
                .ToListAsync();

            var customerDtos = customers.Select(customer => new CustomerGetDto
            {
                CustomerId = customer.CustomerId,
                CardId = customer.CardId,
                CreatedAt = customer.CreatedAt,
                CreatedBy = customer.CreatedBy,
                Tickets = customer.CustomerTickets.Select(ct => new CustomerTicketsDto
                {
                    TicketId = ct.TicketId,
                    TicketName = ct.Tickets.TicketName
                }).ToList(),
                Admissions = customer.CustomerAdmissions.Select(ca => new CustomerAdmissionDto
                {
                    AdmissionId = ca.AdmissionId,
                    AdmissionName = ca.Admissions.AdmissionName
                }).ToList()
            }).ToList();

            return customerDtos;
        }




        // GET: api/Customers/5
        [HttpGet("{cardid}")]
        public async Task<ActionResult<CustomerGetIdDto>> GetCustomer(string cardid)
        {
            var customer = await _context.Customers
                .Include(c => c.CustomerTickets)
                .ThenInclude(ct => ct.Tickets)
                .Include(c => c.CustomerAdmissions)
                .ThenInclude(ca => ca.Admissions)
                .FirstOrDefaultAsync(ci => ci.CardId == cardid);

            if (customer == null)
            {
                return NotFound(new { message = "Customer not found." });
            }

            // DTO-ba mapeljük az adatokat
            var customerGetIdDto = new CustomerGetIdDto
            {
                Tickets = customer.CustomerTickets.Select(ct => new CustomerTicketsDto
                {
                    TicketName = ct.Tickets.TicketName
                }).ToList(),
                Admissions = customer.CustomerAdmissions.Select(ca => new CustomerAdmissionDto
                {
                    AdmissionName = ca.Admissions.AdmissionName
                }).ToList()
            };

            return Ok(customerGetIdDto); // 200 OK és a keresett adat
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

        // POST: api/Customers
        // POST: api/Customers
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

            var employeeExists = await _context.Employees.AnyAsync(e => e.EmployeeId == customerpostdto.createdBy);
            if (!employeeExists)
            {
                return BadRequest(new { message = "The CreatedBy ID does not exist in the Employee table." });
            }

            var ticketIds = customerpostdto.TicketsIds.Select(t => t.TicketId).ToList();
            var existingTicketIds = await _context.Tickets
                .Where(t => ticketIds.Contains(t.TicketId))
                .Select(t => t.TicketId)
                .ToListAsync();

            if (ticketIds.Count != existingTicketIds.Count)
            {
                return BadRequest(new { message = "One or more provided Ticket IDs do not exist." });
            }

            var admissionIds = customerpostdto.Admissions.Select(a => a.AdmissionId).ToList();
            var existingAdmissionIds = await _context.Admissions
                .Where(a => admissionIds.Contains(a.AdmissionId))
                .Select(a => a.AdmissionId)
                .ToListAsync();

            if (admissionIds.Count != existingAdmissionIds.Count)
            {
                return BadRequest(new { message = "One or more provided Admission IDs do not exist." });
            }

            var customer = new Customer
            {
                CardId = customerpostdto.CardId,
                CreatedBy = customerpostdto.createdBy,
                CreatedAt = DateTime.Now,
                IsActive = true,
                CustomerTickets = new List<CustomerTicket>(),
                CustomerAdmissions = new List<CustomerAdmission>()
            };

            foreach (var item in customerpostdto.TicketsIds)
            {
                var customerTicket = new CustomerTicket
                {
                    TicketId = item.TicketId
                };
                customer.CustomerTickets.Add(customerTicket);
            }

            foreach (var item in customerpostdto.Admissions)
            {
                var customerAdmission = new CustomerAdmission
                {
                    AdmissionId = item.AdmissionId
                };
                customer.CustomerAdmissions.Add(customerAdmission);
            }

            _context.Customers.Add(customer);
            await _context.SaveChangesAsync();

            return Ok(new { message = "Customer created successfully.", CustomerId = customer.CustomerId });
        }







        private bool CustomerExists(int id)
        {
            return _context.Customers.Any(e => e.CustomerId == id);
        }
    }
}
