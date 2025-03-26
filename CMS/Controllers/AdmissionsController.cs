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
    public class AdmissionsController : ControllerBase
    {
        private readonly CMSContext _context;

        public AdmissionsController(CMSContext context)
        {
            _context = context;
        }

        // GET: api/Admissions
        [HttpGet]
        public async Task<ActionResult<IEnumerable<Admission>>> GetAdmissions()
        {
            return await _context.Admissions.ToListAsync();
        }



        // POST: api/Admissions
        // To protect from overposting attacks, see https://go.microsoft.com/fwlink/?linkid=2123754
        [HttpPost]
        public async Task<ActionResult<Admission>> PostAdmission(Admission admission)
        {
            _context.Admissions.Add(admission);
            await _context.SaveChangesAsync();

            return CreatedAtAction("GetAdmission", new { id = admission.AdmissionId }, admission);
        }

        private bool AdmissionExists(int id)
        {
            return _context.Admissions.Any(e => e.AdmissionId == id);
        }
    }
}
