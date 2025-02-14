using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using System.Text.Json.Serialization;

namespace CMS.Model
{
    public class CustomerAdmission
    {
        [Key]
        public int CustomerAdmissionId { get; set; }
        [Required]
        public int CustomerId { get; set; }
        [ForeignKey(nameof(CustomerId))]
        public Customer Customers { get; set; }
        [Required]
        public int AdmissionId { get; set; }
        [ForeignKey(nameof(AdmissionId))]
        public Admission Admissions { get; set; }

    }
}
