using Microsoft.Build.ObjectModelRemoting;

namespace CMS.Dtos
{
    public class CustomerPostDto
    {
        //public int CustomerId { get; set; }
        public string CardId { get; set; }
        public string Name { get; set; }
        public int CreatedBy { get; set; }
        public bool IsActive { get; set; }

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
