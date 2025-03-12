namespace CMS.Dtos
{
    public class CustomerPostDto
    {
        //public int CustomerId { get; set; }
        public string CardId { get; set; }
        public string Name { get; set; }
        public int createdBy { get; set; }

        public List<CustomerTicketDto> TicketsIds { get; set; }
    }
    public class CustomerTicketDto
    {
        public int TicketId { get; set; }
    }
}
