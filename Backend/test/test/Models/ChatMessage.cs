using MongoDB.Bson.Serialization.Attributes;
using MongoDB.Bson;

namespace test.Models
{
    public class ChatMessage
    { 
 
        [BsonId]
        [BsonRepresentation(BsonType.ObjectId)]
        public string SenderId { get; set; }
        public string ReceiverId { get; set; }
        public string Message { get; set; }
        public DateTime Timestamp { get; set; }

    }
}
