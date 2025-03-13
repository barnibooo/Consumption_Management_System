namespace CMS.Dtos
{
    public class ConsumptionGetIdDto
    {
        public string ProductName { get; set; }
        public string Description { get; set; }
        public DateTime OrderDate { get; set; }
        public int Quantity { get; set; }
        public decimal Price { get; set; }

    }
}
