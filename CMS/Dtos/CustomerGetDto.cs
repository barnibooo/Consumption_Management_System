namespace CMS.Dtos
{
    public class CustomerGetDto
    {
        public int CustomerId { get; set; }
        public string CardId { get; set; }
        public string Name { get; set; }
        public DateTime CreatedAt { get; set; }
        public int CreatedBy { get; set; }

        public List<CustomerTicketsDto> Tickets { get; set; }
    }
    public class CustomerTicketsDto
    {
        public string TicketName { get; set; }
    }
}
