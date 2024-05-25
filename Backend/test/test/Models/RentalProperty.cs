using MongoDB.Bson.Serialization.Attributes;
using MongoDB.Bson;
using test.Enum;

namespace test.Models
{
    public class RentalProperty
    {
        [BsonId]
        [BsonRepresentation(BsonType.ObjectId)]
        public string Id { get; set; }

        [BsonElement("userId")]
        public string UserId { get; set; }

        [BsonElement("title")]
        public string Title { get; set; }

        [BsonElement("description")]
        public string Description { get; set; }

        [BsonElement("address")]
        public string Address { get; set; }

        [BsonElement("price")]
        public decimal Price { get; set; }

        [BsonElement("type")]
        public string Type { get; set; }

        //[BsonElement("image")]
        //public string Image { get; set; }

        //[BsonElement("status")]
        //public string Status { get; set; } = "available";

        [BsonElement("imageurl")]
        public string ImageUrl { get; set; }

        [BsonRepresentation(BsonType.String)]
        [BsonElement("status")]
        public PropertyStatus Status { get; set; } = PropertyStatus.Available;

        [BsonElement("createdAt")]
        public DateTime CreatedAt { get; set; } = DateTime.UtcNow;

        [BsonElement("updatedAt")]
        public DateTime UpdatedAt { get; set; } = DateTime.UtcNow;

        [BsonElement("ratings")]
        public List<Rating> Ratings { get; set; } = new List<Rating>();
    }
}
