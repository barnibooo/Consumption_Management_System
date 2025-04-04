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
    public class DailySpecialsController : ControllerBase
    {
        private readonly CMSContext _context;

        public DailySpecialsController(CMSContext context)
        {
            _context = context;
        }

        // GET: api/DailySpecials
        [HttpGet]
        public async Task<ActionResult<IEnumerable<DailySpecialGetDto>>> GetDailySpecials()
        {
            var dailySpecials = await _context.DailySpecials.ToListAsync();
            var dailySpecialGetDtos = new List<DailySpecialGetDto>();

            foreach (var dailySpecial in dailySpecials)
            {
                var soup = await _context.MenuItems.FindAsync(dailySpecial.SoupId);
                var appetizer = await _context.MenuItems.FindAsync(dailySpecial.AppetizerId);
                var mainCourse = await _context.MenuItems.FindAsync(dailySpecial.MainCourseId);
                var hamburger = await _context.MenuItems.FindAsync(dailySpecial.HamburgerId);
                var pizza = await _context.MenuItems.FindAsync(dailySpecial.PizzaId);
                var dessert = await _context.MenuItems.FindAsync(dailySpecial.DessertId);
                var drink = await _context.MenuItems.FindAsync(dailySpecial.DrinkId);
                var coffee = await _context.MenuItems.FindAsync(dailySpecial.CoffeeId);

                var dailySpecialGetDto = new DailySpecialGetDto
                {
                    SoupName = soup?.Name,
                    AppetizerName = appetizer?.Name,
                    MainCourseName = mainCourse?.Name,
                    HamburgerName = hamburger?.Name,
                    PizzaName = pizza?.Name,
                    DessertName = dessert?.Name,
                    DrinkName = drink?.Name,
                    CoffeeName = coffee?.Name
                };

                dailySpecialGetDtos.Add(dailySpecialGetDto);
            }

            return dailySpecialGetDtos;
        }

        // POST: api/DailySpecials
        // To protect from overposting attacks, see https://go.microsoft.com/fwlink/?linkid=2123754
        [HttpPost]
        public async Task<ActionResult<DailySpecial>> PostDailySpecial(DailySpecialPostDto dailySpecialPostDto)
        {
            var soup = await _context.MenuItems.SingleOrDefaultAsync(mi => mi.Name == dailySpecialPostDto.SoupName);
            var appetizer = await _context.MenuItems.SingleOrDefaultAsync(mi => mi.Name == dailySpecialPostDto.AppetizerName);
            var mainCourse = await _context.MenuItems.SingleOrDefaultAsync(mi => mi.Name == dailySpecialPostDto.MainCourseName);
            var hamburger = await _context.MenuItems.SingleOrDefaultAsync(mi => mi.Name == dailySpecialPostDto.HamburgerName);
            var pizza = await _context.MenuItems.SingleOrDefaultAsync(mi => mi.Name == dailySpecialPostDto.PizzaName);
            var dessert = await _context.MenuItems.SingleOrDefaultAsync(mi => mi.Name == dailySpecialPostDto.DessertName);
            var drink = await _context.MenuItems.SingleOrDefaultAsync(mi => mi.Name == dailySpecialPostDto.DrinkName);
            var coffee = await _context.MenuItems.SingleOrDefaultAsync(mi => mi.Name == dailySpecialPostDto.CoffeeName);

            if (soup == null || appetizer == null || mainCourse == null || hamburger == null || pizza == null || dessert == null || drink == null || coffee == null)
            {
                return BadRequest("One or more menu items not found.");
            }

            var dailySpecial = new DailySpecial
            {
                SoupId = soup.ItemId,
                AppetizerId = appetizer.ItemId,
                MainCourseId = mainCourse.ItemId,
                HamburgerId = hamburger.ItemId,
                PizzaId = pizza.ItemId,
                DessertId = dessert.ItemId,
                DrinkId = drink.ItemId,
                CoffeeId = coffee.ItemId
            };

            _context.DailySpecials.Add(dailySpecial);
            await _context.SaveChangesAsync();

            return CreatedAtAction(nameof(GetDailySpecials), new { id = dailySpecial.SpecialId }, dailySpecial);
        }

        // DELETE: api/DailySpecials/5
        [HttpDelete("{id}")]
        public async Task<IActionResult> DeleteDailySpecial(int id)
        {
            var dailySpecial = await _context.DailySpecials.FindAsync(id);
            if (dailySpecial == null)
            {
                return NotFound();
            }

            _context.DailySpecials.Remove(dailySpecial);
            await _context.SaveChangesAsync();

            return NoContent();
        }

        private bool DailySpecialExists(int id)
        {
            return _context.DailySpecials.Any(e => e.SpecialId == id);
        }
    }
}
