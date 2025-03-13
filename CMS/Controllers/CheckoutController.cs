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
    public class CheckoutController : ControllerBase
    {
        private readonly CMSContext _context;

        public CheckoutController(CMSContext context)
        {
            _context = context;
        }
        [HttpGet("{customerCardId}")]
        public async Task<ActionResult<IEnumerable<ConsumptionGetIdDto>>> GetCustomerConsumption(string customerCardId)
        {
            var customer = await _context.Customers
                .FirstOrDefaultAsync(c => c.CardId == customerCardId);

            if (customer == null)
            {
                return NotFound(new { message = "Customer not found" });
            }

            var consumptionData = await _context.Orders
                .Where(o => o.CustomerId == customer.CustomerId)
                .SelectMany(o => o.MenuItemOrders)
                .Select(mio => new ConsumptionGetIdDto
                {
                    ProductName = mio.MenuItems.Name, 
                    Description = mio.MenuItems.Description, 
                    OrderDate = mio.Orders.CreatedAt, 
                    Quantity = mio.Quantity,
                    Price = mio.MenuItems.Price 
                })
                .ToListAsync();

            if (!consumptionData.Any())
            {
                return NotFound(new { message = "No consumption data found for the customer" });
            }

            var totalAmount = consumptionData.Sum(cd => cd.Price * cd.Quantity);

            return Ok(new
            {
                Consumption = consumptionData,
                TotalAmount = totalAmount
            });
        }

    }
}
