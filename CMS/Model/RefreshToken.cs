namespace CMS.Model
{
    public class RefreshToken
    {

        public int Id { get; set; }

        public string Token { get; set; }

        public DateTime Expires { get; set; }

        public int EmployeeId { get; set; }

        public Employee Employee { get; set; }

    }
}
