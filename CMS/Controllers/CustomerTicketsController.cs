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
    public class CustomerTicketsController : ControllerBase
    {
        private readonly CMSContext _context;

        public CustomerTicketsController(CMSContext context)
        {
            _context = context;
        }

    }
}
