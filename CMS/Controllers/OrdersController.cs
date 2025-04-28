using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using CMS.Dtos;
using CMS.Models;
using Microsoft.AspNetCore.Authorization;

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

        
        [HttpPost]
        [Authorize(Policy = "AdminOrRestaurantOnly")]
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