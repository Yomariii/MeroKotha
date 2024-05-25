using MongoDB.Bson;
using MongoDB.Bson.Serialization.Attributes;

namespace test.Models
{
    public class PropertyPhoto
    {
        [BsonId]
        [BsonRepresentation(BsonType.ObjectId)]
        public string Id { get; set; }

        [BsonElement("PropertyId")]
        public string PropertyId { get; set; }

        [BsonElement("UserId")]
        public string UserId { get; set; }

        [BsonElement("PhotoUrl")]
        public string PhotoUrl { get; set; }

        [BsonElement("PhotoName")]
        public string PhotoName { get; set; }
    }
}
