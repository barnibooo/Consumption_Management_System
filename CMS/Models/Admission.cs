using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using System.Text.Json.Serialization;

namespace CMS.Models
{
    public class Admission
    {
        [Key]
        public int AdmissionId { get; set; }
        [Required]
        public string? AdmissionName { get; set; }

        [Required]
        public string Category { get; set; }

        [Required]
        public int Price { get; set; }

        [Required]
        public string Description { get; set; }

        [Required]
        public string ImagePath { get; set; }
        [JsonIgnore]
        [InverseProperty("Admissions")]
        public List<CustomerAdmission>? CustomerAdmissions { get; set; }
    }
}
