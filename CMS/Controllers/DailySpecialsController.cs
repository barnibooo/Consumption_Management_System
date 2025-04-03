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
    public class DailySpecialsController : ControllerBase
    {
        private readonly CMSContext _context;

        public DailySpecialsController(CMSContext context)
        {
            _context = context;
        }

        // GET: api/DailySpecials
        [HttpGet]
        public async Task<ActionResult<IEnumerable<DailySpecial>>> GetDailySpecials()
        {
            return await _context.DailySpecials.ToListAsync();
        }

        // POST: api/DailySpecials
        // To protect from overposting attacks, see https://go.microsoft.com/fwlink/?linkid=2123754
        [HttpPost]
        public async Task<ActionResult<DailySpecial>> PostDailySpecial(DailySpecial dailySpecial)
        {
            _context.DailySpecials.Add(dailySpecial);
            await _context.SaveChangesAsync();

            return CreatedAtAction("GetDailySpecial", new { id = dailySpecial.SpecialId }, dailySpecial);
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
