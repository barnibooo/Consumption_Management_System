using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using System.Text.Json.Serialization;

namespace CMS.Model
{
    public class Admission
    {
        [Key]
        public int AdmissionId { get; set; }
        [Required]
        public string AdmissionName { get; set; }
        [JsonIgnore]
        public List<Customer>? Customers { get; set; }
        [JsonIgnore]
        [InverseProperty("Admissions")]
        public List<CustomerAdmission>? CustomerAdmissions { get; set; }
    }
}
