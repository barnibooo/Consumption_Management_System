namespace CMS.Dtos
{
    public class CustomerPostDto
    {
        //public int CustomerId { get; set; }
        public string CardId { get; set; }
        public int createdBy { get; set; }

        public List<CustomerTicketsOnlyIdDto> TicketsIds { get; set; }
        public List<CustomerAdmissionOnlyIdDto> Admissions { get; set; }
    }
    public class CustomerTicketsOnlyIdDto
    {
        public int TicketId { get; set; }
    }
    public class CustomerAdmissionOnlyIdDto
    {
        public int AdmissionId { get; set; }
    }

}
