using System.ComponentModel.DataAnnotations;

namespace CMS.Dtos
{
    public class DailySpecialGetDto
    {

        public string SoupName { get; set; }
        public string AppetizerName { get; set; }
        public string MainCourseName { get; set; }
        public string HamburgerName { get; set; }
        public string PizzaName { get; set; }
        public string DessertName { get; set; }
        public string DrinkName { get; set; }
        public string CoffeeName { get; set; }
    }
}
