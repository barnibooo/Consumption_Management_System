using System.ComponentModel.DataAnnotations;

namespace CMS.Dtos
{
    public class DailySpecialPostDto
    {

        public int SoupId { get; set; }
        public int AppetizerId { get; set; }
        public int MainCourseId { get; set; }
        public int HamburgerId { get; set; }
        public int PizzaId { get; set; }
        public int DessertId { get; set; }
        public int DrinkId { get; set; }
        public int CoffeeId { get; set; }
    }
}
