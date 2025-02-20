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

        // POST: api/Orders
        // To protect from overposting attacks, see https://go.microsoft.com/fwlink/?linkid=2123754
        [HttpPost]
        public async Task<IActionResult> CreateOrder([FromBody] OrderPostDto orderPostDto)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }

            var order = new Order
            {
                CustomerId = orderPostDto.CustomerId,
                EmployeeId = orderPostDto.EmployeeId,
                CreatedAt = DateTime.Now
            };

            foreach (var item in orderPostDto.MenuItems)
            {
                var menuItem = await _context.MenuItems.FindAsync(item.MenuItemId);
                if (menuItem != null)
                {
                    order.MenuItemOrders.Add(new MenuItemOrder
                    {
                        ItemId = item.MenuItemId,
                        Quantity = item.Quantity
                    });
                }
            }

            _context.Orders.Add(order);
            await _context.SaveChangesAsync();

            return CreatedAtAction(nameof(CreateOrder), new { id = order.OrderId }, new
            {
                message = "Order created successfully.",
            });
        }


        private bool OrderExists(int id)
        {
            return _context.Orders.Any(e => e.OrderId == id);
        }
    }
}
