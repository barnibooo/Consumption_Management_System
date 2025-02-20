using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using System.Text.Json.Serialization;

namespace CMS.Model
{
    public class MenuItem
    {
        [Key]
        public int ItemId { get; set; }

        [Required]
        public string Name { get; set; }

        [Required]
        public string Category { get; set; }

        [Required]
        public int Price { get; set; }

        [Required]
        public string Description { get; set; }

        [Required]
        public bool IsAvailable { get; set; }

        [Required]
        public string ImagePath { get; set; }

        [JsonIgnore]
        public List<Order>? Orders { get; set; }

        [JsonIgnore]
        [InverseProperty("MenuItems")]
        public List<MenuItemOrder>? MenuItemOrders { get; set; }

        
    }
}
