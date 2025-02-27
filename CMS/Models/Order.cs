using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using System.Text.Json.Serialization;

namespace CMS.Models
{
    public class Order
    {
        [Key]
        public int OrderId { get; set; }
        [Required]
        public string CardId { get; set; }
        [Required]
        public int EmployeeId { get; set; }
        [Required]
        public DateTime CreatedAt { get; set; }

        public List<MenuItem> MenuItems { get; set; }
        [JsonIgnore]
        [InverseProperty("Orders")]
        public List<MenuItemOrder>? MenuItemOrders { get; set; }
        [JsonIgnore]
        [ForeignKey("CustomerId")]
        public Customer? Customer { get; set; }
        [JsonIgnore]
        [ForeignKey("EmployeeId")]
        public Employee? Employee { get; set; }
    }
}
