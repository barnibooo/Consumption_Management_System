using System.ComponentModel.DataAnnotations.Schema;
using System.ComponentModel.DataAnnotations;
using System.Text.Json.Serialization;

namespace CMS.Models
{
    public class Ticket
    {
        [Key]
        public int TicketId { get; set; }
        [Required]
        public string? TicketName { get; set; }

        [Required]
        public string Category { get; set; }

        [Required]
        public int Price { get; set; }

        [Required]
        public string Description { get; set; }


        [Required]
        public string ImagePath { get; set; }
        [JsonIgnore]
        [InverseProperty("Tickets")]
        public List<CustomerTicket>? CustomerTickets { get; set; }
    }
}
