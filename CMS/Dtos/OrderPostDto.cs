namespace CMS.Dtos
{
    public class OrderPostDto
    {
        public int CustomerId { get; set; }
        public int EmployeeId { get; set; }
        public List<int> MenuItemIds { get; set; }
    }
}
