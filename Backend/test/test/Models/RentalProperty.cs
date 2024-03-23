using MongoDB.Bson.Serialization.Attributes;
using MongoDB.Bson;

namespace test.Models
{
    public class RentalProperty
    {
        [BsonId]
        [BsonRepresentation(BsonType.ObjectId)]
        public string Id { get; set; }

        public string Name { get; set; }
        public string Description { get; set; }
        public decimal Price { get; set; }
        public List<string> Photos { get; set; }
        public double AverageRating { get; set; }

        

        // Location coordinates
        public double Latitude { get; set; }
        public double Longitude { get; set; }
    }
}
