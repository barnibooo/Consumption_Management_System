namespace CMS.Dtos
{
    public class MenuItemPostDto
    {
        public string Name { get; set; }
        public string Category { get; set; }
        public int Price { get; set; }
        public string Description { get; set; }
        public bool IsAvailable { get; set; }
        public string ImagePath { get; set; }
    }
}
