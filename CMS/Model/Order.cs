using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using System.Text.Json.Serialization;

namespace CMS.Model
{
    public class Order
    {
        [Key]
        public int OrderId { get; set; }
        [Required]
        public int CustomerId { get; set; }
        [Required]
        public int EmployeeId { get; set; }
        [JsonIgnore]
        public List<MenuItem>? MenuItems { get; set; }
        [JsonIgnore]
        [InverseProperty("Orders")]
        public List<MenuItemOrder>? MenuItemOrders { get; set; }
    }
}
