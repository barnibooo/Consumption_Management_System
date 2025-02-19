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
    public class OrdersController : ControllerBase
    {
        private readonly CMSContext _context;

        public OrdersController(CMSContext context)
        {
            _context = context;
        }

        // GET: api/Orders
        [HttpGet]

        public async Task<ActionResult<IEnumerable<Object>>> GetOrders()
        {
            return await _context.Orders.Select(item =>
            new
            {
                OrderId = item.OrderId,
                CutomerId = item.CustomerId,
                EmployeeId = item.EmployeeId,
                CreatedAt = item.CreatedAt,
                MenuItems = item.MenuItems.Select(c => new { c.ItemId, c.Name }).ToList()

            }
            ).ToListAsync();

        }



        // GET: api/Orders/5
        [HttpGet("{id}")]
        public async Task<ActionResult<Order>> GetOrder(int id)
        {
            var order = await _context.Orders.FindAsync(id);

            if (order == null)
            {
                return NotFound();
            }

            return order;
        }

        // PUT: api/Orders/5
        // To protect from overposting attacks, see https://go.microsoft.com/fwlink/?linkid=2123754
        [HttpPut("{id}")]
        public async Task<IActionResult> PutOrder(int id, Order order)
        {
            if (id != order.OrderId)
            {
                return BadRequest();
            }

            _context.Entry(order).State = EntityState.Modified;

            try
            {
                await _context.SaveChangesAsync();
            }
            catch (DbUpdateConcurrencyException)
            {
                if (!OrderExists(id))
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

        // POST: api/Orders
        // To protect from overposting attacks, see https://go.microsoft.com/fwlink/?linkid=2123754
        [HttpPost]
        public async Task<IActionResult> CreateOrder([FromBody] OrderPostDto OrderPostDto)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState); // 400-as válasz, ha a DTO nem érvényes
            }

            var menuItems = _context.MenuItems.Where(c => OrderPostDto.MenuItemIds.Contains(c.ItemId)).ToList();

            var order = new Order
            {
                CustomerId = OrderPostDto.CustomerId,
                EmployeeId = OrderPostDto.EmployeeId,
                CreatedAt = DateTime.Now,
                MenuItems = menuItems,
            };

            _context.Orders.Add(order);
            await _context.SaveChangesAsync();

            return CreatedAtAction(nameof(CreateOrder), new { id = order.OrderId }, new
            {
                message = "Order created successfully.",
            });
        }

        // DELETE: api/Orders/5
        [HttpDelete("{id}")]
        public async Task<IActionResult> DeleteOrder(int id)
        {
            var order = await _context.Orders.FindAsync(id);
            if (order == null)
            {
                return NotFound();
            }

            _context.Orders.Remove(order);
            await _context.SaveChangesAsync();

            return NoContent();
        }

        private bool OrderExists(int id)
        {
            return _context.Orders.Any(e => e.OrderId == id);
        }
    }
}
