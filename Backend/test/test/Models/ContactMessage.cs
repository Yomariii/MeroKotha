using MongoDB.Bson;

namespace test.Models
{
    public class ContactMessage
    {
        public ObjectId Id { get; set; }
        public string Name { get; set; }
        public string Email { get; set; }
        public string Message { get; set; }

    }
}
