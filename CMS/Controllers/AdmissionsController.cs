using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using CMS.Models;
using Microsoft.AspNetCore.Authorization;

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
        [Authorize(Policy = "AdminOrTicketOnly")]
        public async Task<ActionResult<IEnumerable<Admission>>> GetAdmissions()
        {
            return await _context.Admissions.ToListAsync();
        }
    }
}
