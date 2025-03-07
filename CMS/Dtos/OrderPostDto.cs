namespace CMS.Dtos
{
    public class OrderPostDto
    {
        public int CustomerId { get; set; }
        public int EmployeeId { get; set; }
        public List<OrderMenuItemDto> MenuItems { get; set; }
    }
    public class OrderMenuItemDto
    {
        public int MenuItemId { get; set; }
        public int Quantity { get; set; }
    }
}
