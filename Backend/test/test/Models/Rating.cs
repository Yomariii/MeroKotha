using MongoDB.Bson;
using MongoDB.Bson.Serialization.Attributes;

namespace test.Models
{
    public class Rating
    {
        [BsonId]
        [BsonRepresentation(BsonType.ObjectId)]
        public string Id { get; set; }

        [BsonElement("userId")]
        public string UserId { get; set; }

        [BsonElement("rating")]
        public int RatingValue { get; set; } // Assuming rating is an integer, e.g., 1-5

        [BsonElement("comment")]
        public string Comment { get; set; }

        [BsonElement("createdAt")]
        public DateTime CreatedAt { get; set; } = DateTime.UtcNow;

        [BsonElement("updatedAt")]
        public DateTime UpdatedAt { get; set; } = DateTime.UtcNow;
    }
}
