namespace test.Dtos
{
    public class RatingDto
    {
        public string Id { get; set; }
        public string UserId { get; set; }
        public int RatingValue { get; set; }
        public string Comment { get; set; }
        public DateTime CreatedAt { get; set; }
        public DateTime UpdatedAt { get; set; }
    }
}
