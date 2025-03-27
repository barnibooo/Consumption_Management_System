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
    public class CheckoutController : ControllerBase
    {
        private readonly CMSContext _context;

        public CheckoutController(CMSContext context)
        {
            _context = context;
        }
        [HttpGet("{customerCardId}")]
        [Authorize(Policy = "AdminOrTicketOnly")]
        public async Task<ActionResult> GetCustomerConsumption(string customerCardId)
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

            var totalAmount = consumptionData.Sum(cd => cd.Price * cd.Quantity);

            if (!consumptionData.Any())
            {
                return Ok(new
                {
                    TotalAmount = 0,
                    Message = "Nem történt fogyasztás"
                });
            }

            return Ok(new
            {
                Consumption = consumptionData,
                TotalAmount = totalAmount
            });
        }



    }
}
