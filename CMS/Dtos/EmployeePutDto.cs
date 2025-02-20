﻿using System.ComponentModel.DataAnnotations;

namespace CMS.Dtos
{
    public class EmployeePutDto
    {
        [Required(ErrorMessage = "First name is required.")]
        public string FirstName { get; set; }

        [Required(ErrorMessage = "Last name is required.")]
        public string LastName { get; set; }
    }
}
