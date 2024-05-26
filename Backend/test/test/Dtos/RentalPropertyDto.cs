using test.Enum;

namespace test.Dtos
{
    public class RentalPropertyDto
    {
        public string Id { get; set; }
        public string UserId { get; set; }
        public string Title { get; set; }
        public string Description { get; set; }
        public string Address { get; set; }
        public string Type { get; set; }
        public decimal Price { get; set; }
        public DateTime CreatedAt { get; set; }
        public DateTime UpdatedAt { get; set; }
        public string UserName { get; set; }
        public string FullName { get; set; }
        public string Email { get; set; }
        public string PhoneNumber { get; set; }
        public List<string> ImageUrls { get; set; } = new List<string>();
        public PropertyStatus Status { get; set; }

        public List<RatingDto> Ratings { get; set; } = new List<RatingDto>();
    }
}
