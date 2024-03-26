using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using MongoDB.Driver;
using test.Dtos;
using test.Models;

namespace test.Controllers
{
    [Route("api/RentalProperty")]
    [ApiController]
    public class RentalPropertyController : ControllerBase
    {
        private readonly IMongoCollection<RentalProperty> _propertyCollection;

        public RentalPropertyController(IMongoDatabase database)
        {
            _propertyCollection = database.GetCollection<RentalProperty>("rentalproperty");
        }


        [HttpPost]
        [Route("Creation")]
        [Authorize(Roles = "ADMIN,LANDLORD")]
        public async Task< IActionResult> CreateProperty([FromBody] RentalRequest request)
        {
            try
            {
                var property = new RentalProperty
                {
                    Name = request.Name,
                    Description = request.Description,
                    Price = request.Price,
                    Photos = request.Photos,
                    Latitude = request.Latitude,
                    Longitude = request.Longitude
                };

                await _propertyCollection.InsertOneAsync(property);

                return Ok("Rental property created successfully");
            }
            catch (Exception ex)
            {
                return StatusCode(500, $"Internal Server Error: {ex.Message}");
            }
        }

        [HttpGet]
        [Route("List")]
        [Authorize(Roles = "ADMIN,LANDLORD,TENANT")]
        public async Task<IActionResult> GetProperty()
        {
            try
            {
                var property = await _propertyCollection.Find(itinerary => true).ToListAsync();
                return Ok(property);
            }
            catch (Exception ex)
            {
                return StatusCode(500, $"Internal Server Error: {ex.Message}");
            }
        }

        [HttpGet("{id}")]
        public async Task<IActionResult> GetProperty(string id)
        {
            try
            {
                var property = await _propertyCollection.Find(p => p.Id == id).FirstOrDefaultAsync();
                if (property == null)
                {
                    return NotFound("Property not found");
                }
                return Ok(property);
            }
            catch (Exception ex)
            {
                return StatusCode(500, $"Internal Server Error: {ex.Message}");
            }
        }


        [HttpDelete("{id}")]
        [Authorize(Roles = "ADMIN,LANDLORD")]
        public async Task<IActionResult> DeleteProperty(string id)
        {
            try
            {
                await _propertyCollection.DeleteOneAsync(property => property.Id == id);
                return Ok("Property deleted successfully");
            }
            catch (Exception ex)
            {
                return StatusCode(500, $"Internal Server Error: {ex.Message}");
            }
        }

        [HttpPut("{id}")]
        [Authorize(Roles = "ADMIN,LANDLORD")]
        public async Task<IActionResult> UpdateProperty(string id, [FromBody] RentalRequest request)
        {
            try
            {
                var existingProperty = await _propertyCollection.FindOneAndUpdateAsync(
                    Builders<RentalProperty>.Filter.Eq(property => property.Id, id),
                    Builders<RentalProperty>.Update
                        .Set(property => property.Name, request.Name)
                        .Set(property => property.Description, request.Description)
                        .Set(property => property.Price, request.Price)
                        .Set(property => property.Photos, request.Photos)
                        .Set(property => property.Latitude, request.Latitude)
                        .Set(property => property.Longitude, request.Longitude)
                );

                if (existingProperty == null)
                {
                    return NotFound("Property not found");
                }

                return Ok("Property updated successfully");
            }
            catch (Exception ex)
            {
                return StatusCode(500, $"Internal Server Error: {ex.Message}");
            }
        }




    }
}
