using CMS.Models;

namespace CMS.Dtos
{
    public class RegisterDto
    {
        public string Username { get; set; }
        public string FirstName { get; set; }
        public string LastName { get; set; }
        public string Password { get; set; }
        public Roles Role { get; set; }

    }
}
