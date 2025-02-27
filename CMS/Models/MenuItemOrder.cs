using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace CMS.Models
{
    public class MenuItemOrder
    {
        [Key]
        public int MenuItemOrderId { get; set; }
        [Required]
        
        public int ItemId { get; set; }
        [ForeignKey(nameof(ItemId))]
        public MenuItem MenuItems { get; set; }
        [Required]
        public int OrderId { get; set; }
        [ForeignKey(nameof(OrderId))]
        public Order Orders { get; set; }
        public int Quantity { get; set; }
    }
}
