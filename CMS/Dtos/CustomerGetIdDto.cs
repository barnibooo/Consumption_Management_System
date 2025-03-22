namespace CMS.Dtos
{
    public class CustomerGetIdDto
    {
        public string Name { get; set; }
        public string customerId { get; set; }

        public List<CustomerTicketsDto> Tickets { get; set; }
        public List<CustomerAdmissionDto> Admissions { get; set; }
    }


}
