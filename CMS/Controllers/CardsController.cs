using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using CMS.Models;
using Microsoft.AspNetCore.Authorization;

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
        [Authorize(Policy = "AdminOrRestaurantOnly")]
        public async Task<ActionResult<object>> GetCustomerIdByCardId(string cardId)
        {
            var customer = await _context.Customers.FirstOrDefaultAsync(c => c.CardId == cardId);

            if (customer == null)
            {
                return NotFound(new { Message = "Customer not found." });
            }

            if (!customer.IsActive)
            {
                return Ok(new { Message = "Customer is not active." });
            }

            return Ok(new { CustomerId = customer.CustomerId });
        }
    }
}
