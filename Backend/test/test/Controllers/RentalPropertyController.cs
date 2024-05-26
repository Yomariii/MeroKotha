using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Mvc;
using MongoDB.Driver;
using test.Dtos;
using test.Models;

namespace test.Controllers
{
    [ApiController]
    [Route("api/rent")]
    public class RentalPropertyController: ControllerBase
    {
        private readonly IMongoCollection<RentalProperty> _rentalProperties;
        private readonly UserManager<ApplicationUser> _userManager;

        public RentalPropertyController(IMongoDatabase database, UserManager<ApplicationUser> userManager)
        {
            _rentalProperties = database.GetCollection<RentalProperty>("RentalProperties");
            _userManager = userManager;
        }

        [HttpGet]
        public async Task<ActionResult<IEnumerable<RentalPropertyDto>>> GetRentalProperties()
        {
            var rentalProperties = await _rentalProperties.Find(rp => true).ToListAsync();
            var rentalPropertyDTOs = rentalProperties.Select(rp => new RentalPropertyDto
            {
                Id = rp.Id,
                UserId = rp.UserId,
                Title = rp.Title,
                Description = rp.Description,
                Address = rp.Address,
                Price = rp.Price,
                Type = rp.Type,
                Status = rp.Status,
                CreatedAt = rp.CreatedAt,
                UpdatedAt = rp.UpdatedAt,
                ImageUrls = rp.ImageUrls,
                Ratings = rp.Ratings.Select(r => new RatingDto
                {
                    Id = r.Id,
                    UserId = r.UserId,
                    RatingValue = r.RatingValue,
                    Comment = r.Comment,
                    CreatedAt = r.CreatedAt,
                    UpdatedAt = r.UpdatedAt
                }).ToList()

            }).ToList();

            return Ok(rentalPropertyDTOs);
        }

            [HttpGet("{id}")]
            public async Task<ActionResult<RentalPropertyDto>> GetRentalProperty(string id)
            {
                var rentalProperty = await _rentalProperties.Find(rp => rp.Id == id).FirstOrDefaultAsync();

                if (rentalProperty == null)
                {
                    return NotFound();
                }

                // Fetch the user
                var user = await _userManager.FindByIdAsync(rentalProperty.UserId);
                if (user == null)
                {
                    return NotFound("User not found");
                }

                var rentalPropertyDTO = new RentalPropertyDto
                {
                    Id = rentalProperty.Id,
                    UserId = rentalProperty.UserId,
                    UserName = user.UserName,
                    FullName = user.FullName,
                    PhoneNumber = user.PhoneNumber,
                    Title = rentalProperty.Title,
                    Description = rentalProperty.Description,
                    Address = rentalProperty.Address,
                    Price = rentalProperty.Price,
                    Type = rentalProperty.Type,
                    Status = rentalProperty.Status,
                    ImageUrls = rentalProperty.ImageUrls,
                    CreatedAt = rentalProperty.CreatedAt,
                    UpdatedAt = rentalProperty.UpdatedAt,
                    Ratings = rentalProperty.Ratings.Select(r => new RatingDto
                    {
                        Id = r.Id,
                        UserId = r.UserId,
                        RatingValue = r.RatingValue,
                        Comment = r.Comment,
                        CreatedAt = r.CreatedAt,
                        UpdatedAt = r.UpdatedAt
                    }).ToList()
                };

            return Ok(rentalPropertyDTO);
        }

        [HttpPost]
        public async Task<ActionResult<RentalPropertyDto>> CreateRentalProperty([FromBody] CreateRentalPropertyDto createRentalPropertyDTO)
        {
            var rentalProperty = new RentalProperty
            {
                UserId = createRentalPropertyDTO.UserId,
                Title = createRentalPropertyDTO.Title,
                Description = createRentalPropertyDTO.Description,
                Address = createRentalPropertyDTO.Address,
                Price = createRentalPropertyDTO.Price,
                Type = createRentalPropertyDTO.Type, 
                ImageUrls = createRentalPropertyDTO.ImageUrls,
                Status = createRentalPropertyDTO.Status

            };

            await _rentalProperties.InsertOneAsync(rentalProperty);

            var rentalPropertyDTO = new RentalPropertyDto
            {
                Id = rentalProperty.Id,
                UserId = rentalProperty.UserId,
                Title = rentalProperty.Title,
                Description = rentalProperty.Description,
                Address = rentalProperty.Address,
                Price = rentalProperty.Price,
                Type = rentalProperty.Type,
                Status = rentalProperty.Status,
                CreatedAt = rentalProperty.CreatedAt,
                UpdatedAt = rentalProperty.UpdatedAt,
                Ratings = new List<RatingDto>()
            };

            return CreatedAtAction(nameof(GetRentalProperty), new { id = rentalPropertyDTO.Id }, rentalPropertyDTO);
        }

        [HttpPut("{id}")]
        public async Task<IActionResult> UpdateRentalProperty(string id, [FromBody] UpdateRentalPropertyDto updateRentalPropertyDTO)
        {
            var rentalProperty = await _rentalProperties.Find(rp => rp.Id == id).FirstOrDefaultAsync();

            if (rentalProperty == null)
            {
                return NotFound();
            }

            rentalProperty.Title = updateRentalPropertyDTO.Title;
            rentalProperty.Description = updateRentalPropertyDTO.Description;
            rentalProperty.Address = updateRentalPropertyDTO.Address;
            rentalProperty.Price = updateRentalPropertyDTO.Price;
            rentalProperty.Status = updateRentalPropertyDTO.Status;
            rentalProperty.Type = updateRentalPropertyDTO.Type;
            rentalProperty.ImageUrls = updateRentalPropertyDTO.ImageUrls;
            rentalProperty.UpdatedAt = DateTime.UtcNow;
            

            await _rentalProperties.ReplaceOneAsync(rp => rp.Id == id, rentalProperty);

            return NoContent();
        }

        [HttpDelete("{id}")]
        public async Task<IActionResult> DeleteRentalProperty(string id)
        {
            var result = await _rentalProperties.DeleteOneAsync(rp => rp.Id == id);

            if (result.DeletedCount == 0)
            {
                return NotFound();
            }

            return NoContent();
        }

        [HttpPost("{id}/ratings")]
        public async Task<ActionResult<RatingDto>> AddRating(string id, [FromBody] CreateRatingDto createRatingDTO)
        {
            var rentalProperty = await _rentalProperties.Find(rp => rp.Id == id).FirstOrDefaultAsync();

            if (rentalProperty == null)
            {
                return NotFound();
            }

            var rating = new Rating
            {
                UserId = createRatingDTO.UserId,
                RatingValue = createRatingDTO.RatingValue,
                
            };

            rentalProperty.Ratings.Add(rating);
            rentalProperty.UpdatedAt = DateTime.UtcNow;

            await _rentalProperties.ReplaceOneAsync(rp => rp.Id == id, rentalProperty);

            var ratingDTO = new RatingDto
            {
                Id = rating.Id,
                UserId = rating.UserId,
                RatingValue = rating.RatingValue,
                CreatedAt = rating.CreatedAt,
                UpdatedAt = rating.UpdatedAt
            };

            return CreatedAtAction(nameof(GetRentalProperty), new { id = rentalProperty.Id }, ratingDTO);
        }
    }
}
