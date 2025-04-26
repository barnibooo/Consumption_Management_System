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
    public class CustomerAdmissionsController : ControllerBase
    {
        private readonly CMSContext _context;

        public CustomerAdmissionsController(CMSContext context)
        {
            _context = context;
        }

        
    }
}
