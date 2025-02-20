using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using System.Text.Json.Serialization;

namespace CMS.Model
{
    public class Customer
    {
        [Key]
        public int CustomerId { get; set; }
        [Required]
        public int CardId { get; set; }
        [Required]
        public string Name { get; set; }
        [Required]
        public DateTime CreatedAt { get; set; }
        [Required]
        public bool IsActive{ get; set; }
        [JsonIgnore]
        public List<Order>? Orders { get; set; }
        [JsonIgnore]
        [InverseProperty("Customers")]
        public List<CustomerAdmission>? CustomerAdmissions { get; set; }
    }
}
