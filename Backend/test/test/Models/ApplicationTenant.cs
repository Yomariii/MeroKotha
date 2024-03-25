using AspNetCore.Identity.MongoDbCore.Models;
using MongoDbGenericRepository.Attributes;

namespace test.Models
{
    public class ApplicationTenant
    {
        [CollectionName("Tenant")]
        public class ApplicationUser : MongoIdentityUser<Guid>
        {
            public string Username { get; set; } = string.Empty;
            public string FullName { get; set; } = string.Empty;
            public string Address { get; set; } = string.Empty;
        }
    }
}
