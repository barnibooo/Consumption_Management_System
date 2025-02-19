namespace CMS.Dtos
{
    public class OrderGetDto
    {
        public int Id { get; set; }
        public int CustomerId { get; set; }
        public int EmployeeId { get; set; }
        public DateTime CreatedAt { get; set; }
        public List<int> MenuItemIds { get; set; }
    }
}
