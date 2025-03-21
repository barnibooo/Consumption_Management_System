using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using System.Text.Json.Serialization;
using CMS.Models;

namespace CMS.Models
{
    public class Customer
    {
        [Key]
        public int CustomerId { get; set; }
        [Required]
        public string CardId { get; set; }
        [Required]
        public DateTime CreatedAt { get; set; }
        [Required]
        public bool IsActive { get; set; }
        [Required]
        public int CreatedBy { get; set; }
        [JsonIgnore]
        public List<Order>? Orders { get; set; }
        [JsonIgnore]
        [InverseProperty("Customers")]
        public List<CustomerAdmission>? CustomerAdmissions { get; set; }
        [JsonIgnore]
        [InverseProperty("Customers")]
        public List<CustomerTicket>? CustomerTickets { get; set; }
    }
}