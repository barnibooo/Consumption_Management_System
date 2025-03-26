using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using CMS.Dtos;
using CMS.Models;

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
       /* [HttpGet]
        public async Task<ActionResult<IEnumerable<Object>>> GetOrders()
        {
            return await _context.Orders.Select(order => new
            {
                OrderId = order.OrderId,
                CustomerId = order.CustomerId,
                EmployeeId = order.EmployeeId,
                CreatedAt = order.CreatedAt,
                MenuItems = order.MenuItemOrders.Select(mio => new
                {
                    mio.MenuItems.ItemId,
                    mio.Quantity
                }).ToList()
            }).ToListAsync();
        }*/



        // GET: api/Orders/5
       /* [HttpGet("{id}")]
        public async Task<ActionResult<OrderGetDto>> GetOrder(int id)
        {
            var order = await _context.Orders.FindAsync(id);

            if (order == null)
            {
                return NotFound();
            }
            var orderdto = new OrderGetDto
            {
                Id = order.OrderId,
                CustomerId = order.CustomerId,
                EmployeeId = order.EmployeeId,
                CreatedAt = order.CreatedAt,
                MenuItemIds = order.MenuItems.Select(mio => 
                
                    mio.ItemId
                ).ToList()

            };

            return orderdto;
        }*/

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
                CreatedAt = DateTime.Now,
                MenuItemOrders = new List<MenuItemOrder>()
            };

            foreach (var item in orderPostDto.MenuItems)
            {
                var menuItem = await _context.MenuItems.FindAsync(item.MenuItemId);
                if (menuItem != null)
                {
                    var menuItemOrder = new MenuItemOrder
                    {
                        MenuItems = menuItem,
                        Orders = order,
                        Quantity = item.Quantity
                    };
                    order.MenuItemOrders.Add(menuItemOrder);
                }
            }

            _context.Orders.Add(order);
            await _context.SaveChangesAsync();

            return CreatedAtAction(nameof(CreateOrder), new { id = order.OrderId }, new
            {
                order.OrderId,
            });
        }



        private bool OrderExists(int id)
        {
            return _context.Orders.Any(e => e.OrderId == id);
        }
    }
}