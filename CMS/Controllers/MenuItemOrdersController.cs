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
    public class MenuItemOrdersController : ControllerBase
    {
        private readonly CMSContext _context;

        public MenuItemOrdersController(CMSContext context)
        {
            _context = context;
        }

        // GET: api/MenuItemOrders
        // GET: api/MenuItemOrders
       /* [HttpGet]
        public async Task<ActionResult<IEnumerable<MenuItemOrderDto>>> GetMenuItemOrders()
        {
            var menuItemOrders = await _context.MenuItemOrders
                .Select(m => new MenuItemOrderDto
                {
                    MenuItemOrderId = m.MenuItemOrderId,
                    ItemId = m.ItemId,
                    OrderId = m.OrderId,
                    Quantity = m.Quantity
                })
                .ToListAsync();

            return menuItemOrders;
        }


        // GET: api/MenuItemOrders/5
        [HttpGet("{id}")]
        public async Task<ActionResult<MenuItemOrder>> GetMenuItemOrder(int id)
        {
            var menuItemOrder = await _context.MenuItemOrders.FindAsync(id);

            if (menuItemOrder == null)
            {
                return NotFound();
            }

            return menuItemOrder;
        }

        // PUT: api/MenuItemOrders/5
        // To protect from overposting attacks, see https://go.microsoft.com/fwlink/?linkid=2123754
        [HttpPut("{id}")]
        public async Task<IActionResult> PutMenuItemOrder(int id, MenuItemOrder menuItemOrder)
        {
            if (id != menuItemOrder.MenuItemOrderId)
            {
                return BadRequest();
            }

            _context.Entry(menuItemOrder).State = EntityState.Modified;

            try
            {
                await _context.SaveChangesAsync();
            }
            catch (DbUpdateConcurrencyException)
            {
                if (!MenuItemOrderExists(id))
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

        // POST: api/MenuItemOrders
        // To protect from overposting attacks, see https://go.microsoft.com/fwlink/?linkid=2123754
        [HttpPost]
        public async Task<ActionResult<MenuItemOrder>> PostMenuItemOrder(MenuItemOrder menuItemOrder)
        {
            _context.MenuItemOrders.Add(menuItemOrder);
            await _context.SaveChangesAsync();

            return CreatedAtAction("GetMenuItemOrder", new { id = menuItemOrder.MenuItemOrderId }, menuItemOrder);
        }*/

        private bool MenuItemOrderExists(int id)
        {
            return _context.MenuItemOrders.Any(e => e.MenuItemOrderId == id);
        }
    }
}
