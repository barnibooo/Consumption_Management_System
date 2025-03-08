namespace CMS.Dtos
{
    public class CustomerPostDto
    {
        public string CardId { get; set; }
        public string Name { get; set; }

        public List<CustomerTicketDto> TicketsIds { get; set; }
    }
    public class CustomerTicketDto
    {
        public int TicketId { get; set; }
    }
}
