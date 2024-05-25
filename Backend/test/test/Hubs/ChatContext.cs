using MongoDB.Driver;
using test.Models;

namespace test.Hubs
{
    public class ChatContext
    {
        private readonly IMongoDatabase _database;

        public ChatContext(IMongoDatabase database)
        {
            _database = database;
        }

        public IMongoCollection<ChatMessage> ChatMessages => _database.GetCollection<ChatMessage>("ChatMessages");
    }
}
