using System.ComponentModel.DataAnnotations;

namespace CMS.Models
{
    public class DailySpecial
    {
        [Key]
        [Required]
        public int SpecialId { get; set; }
        [Required]
        public int SoupId { get; set; }
        [Required]
        public int AppetizerId { get; set; }
        [Required]
        public int MainCourseId { get; set; }
        [Required]
        public int HamburgerId { get; set; }
        [Required]
        public int PizzaId { get; set; }
        [Required]
        public int DessertId { get; set; }
        [Required]
        public int DrinkId { get; set; }
        [Required]
        public int CoffeeId { get; set; }
    }
}
