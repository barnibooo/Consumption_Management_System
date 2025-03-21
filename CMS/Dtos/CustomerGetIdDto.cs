namespace CMS.Dtos
{
    public class CustomerGetIdDto
    {
        public DateTime CreatedAt { get; set; }
        public List<CustomerTicketsDto> Tickets { get; set; }
        public List<CustomerAdmissionDto> Admissions { get; set; }
    }


}
