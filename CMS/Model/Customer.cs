using System.ComponentModel.DataAnnotations;
using System.Text.Json.Serialization;

namespace CMS.Model
{
    public class Customer
    {
        [Key]
        public int CustomerId { get; set; }
        [Required]
        public string Name { get; set; }
        [Required]
        public DateTime CreatedAt { get; set; }
        [JsonIgnore]
        public List<Order>? Orders { get; set; }
    }
}
