using test.Enum;

namespace test.Dtos
{
    public class CreateRentalPropertyDto
    {
        public string UserId { get; set; }
        public string Title { get; set; }
        public string Description { get; set; }
        public string Address { get; set; }
        public decimal Price { get; set; }
        public string Type { get; set; }
        public List<string> ImageUrls { get; set; } = new List<string>();
        public PropertyStatus Status { get; set; }
    }
}
