namespace CMS.Dtos
{
    public class CustomerPostDto
    {
        public int CustomerId { get; set; }
        public string CardId { get; set; }
        public string Name{ get; set; }
        public DateTime CreatedAt { get; set; }
        public bool IsActive{ get; set; }

        public List<CustomerAdmissionDto> AdmissionsIds { get; set; }
    }
    public class CustomerAdmissionDto
    {
        public int AdmissionId { get; set; }
    }
}
