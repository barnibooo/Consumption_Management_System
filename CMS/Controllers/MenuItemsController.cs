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
    [Authorize(Policy = "AdminOrRestaurantOnly")]
    public class MenuItemsController : ControllerBase
    {
        private readonly CMSContext _context;

        public MenuItemsController(CMSContext context)
        {
            _context = context;
        }

        // GET: api/MenuItems
        
        [HttpGet]
        
        public async Task<ActionResult<IEnumerable<MenuItem>>> GetMenuItems()
        {
            return await _context.MenuItems.ToListAsync();
        }
        
        // PUT: api/MenuItems/5
        // To protect from overposting attacks, see https://go.microsoft.com/fwlink/?linkid=2123754
       /* [HttpPut("{id}")]
        public async Task<IActionResult> PutMenuItem(int id, MenuItem menuItem)
        {
            if (id != menuItem.ItemId)
            {
                return BadRequest();
            }

            _context.Entry(menuItem).State = EntityState.Modified;

            try
            {
                await _context.SaveChangesAsync();
            }
            catch (DbUpdateConcurrencyException)
            {
                if (!MenuItemExists(id))
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

        // POST: api/MenuItems
        // To protect from overposting attacks, see https://go.microsoft.com/fwlink/?linkid=2123754
        [HttpPost]
        public async Task<IActionResult> CreateMenuItem([FromBody] MenuItemPostDto MenuItemPostDto)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState); // 400-as válasz, ha a DTO nem érvényes
            }

            var menuItem = new MenuItem
            {
                Name = MenuItemPostDto.Name,
                Category = MenuItemPostDto.Category,
                Price = MenuItemPostDto.Price,
                Description = MenuItemPostDto.Description,
                IsAvailable = MenuItemPostDto.IsAvailable,
                ImagePath = MenuItemPostDto.ImagePath
            };

            _context.MenuItems.Add(menuItem);
            await _context.SaveChangesAsync();

            return CreatedAtAction(nameof(CreateMenuItem), new { id = menuItem.ItemId }, new
            {
                message = "Item created successfully.",
            });
        }*/

        private bool MenuItemExists(int id)
        {
            return _context.MenuItems.Any(e => e.ItemId == id);
        }
    }
}
