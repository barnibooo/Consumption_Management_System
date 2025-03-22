namespace CMS.Dtos
{
    public class CustomerGetIdDto
    {
        public string Name { get; set; }
        public int CustomerId { get; set; }
        public DateTime CreatedAt { get; set; }

        public List<CustomerTicketsDto> Tickets { get; set; }
        public List<CustomerAdmissionDto> Admissions { get; set; }
    }


}
