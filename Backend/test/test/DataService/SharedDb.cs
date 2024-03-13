using System.Collections.Concurrent;
using test.Models;

namespace test.DataService
{
    public class SharedDb
    {
        private readonly ConcurrentDictionary<string, UserConnection> _connections = new();
        public ConcurrentDictionary<string, UserConnection> connections => _connections;
    }
}
