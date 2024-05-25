using test.Enum;

namespace test.Dtos
{
    public class UpdateRentalPropertyDto
    {
        public string Title { get; set; }
        public string Description { get; set; }
        public string Address { get; set; }
        public decimal Price { get; set; }
        public PropertyStatus Status { get; set; }
        public string Type { get; internal set; }
    }
}
