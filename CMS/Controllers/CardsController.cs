using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using CMS.Models;

namespace CMS.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class CardsController : ControllerBase
    {
        private readonly CMSContext _context;

        public CardsController(CMSContext context)
        {
            _context = context;
        }


        [HttpGet("GetCustomerIdByCardId/{cardId}")]
        public async Task<ActionResult<int>> GetCustomerIdByCardId(string cardId)
        {
            // Search for the customer with the given CardId
            var customer = await _context.Customers
                .FirstOrDefaultAsync(c => c.CardId == cardId);

            if (customer == null)
            {
                return Ok("Customer not found.");
            }

            // Check if the customer is active
            if (!customer.IsActive)
            {
                return Ok("Customer is not active.");
            }

            // Return the CustomerId
            return Ok(customer.CustomerId);
        }
    }
}
