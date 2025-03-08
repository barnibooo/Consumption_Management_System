using System.ComponentModel.DataAnnotations.Schema;
using System.ComponentModel.DataAnnotations;

namespace CMS.Models
{
    public class CustomerTicket
    {
        [Key]
        public int CustomerTicketId { get; set; }
        [Required]
        public int CustomerId { get; set; }
        [ForeignKey(nameof(CustomerId))]
        public Customer Customers { get; set; }
        [Required]
        public int TicketId { get; set; }
        [ForeignKey(nameof(TicketId))]
        public Ticket Tickets { get; set; }

    }
}
