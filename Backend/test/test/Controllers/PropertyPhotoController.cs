using Microsoft.AspNetCore.Mvc;
using MongoDB.Driver;
using test.Dtos;
using test.Models;

namespace test.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    public class PropertyPhotoController : ControllerBase
    {
        private readonly IMongoCollection<PropertyPhoto> _photoCollection;
        private readonly IWebHostEnvironment _hostEnvironment;

        public PropertyPhotoController(IMongoClient mongoClient, IWebHostEnvironment hostEnvironment)
        {
            _photoCollection = mongoClient.GetDatabase("RentalPropertyDb").GetCollection<PropertyPhoto>("Photos");
            _hostEnvironment = hostEnvironment;
        }

        [HttpPost("upload")]
        public async Task<IActionResult> UploadPhoto([FromForm] PropertyPhotoDto photoUploadDTO)
        {
            if (photoUploadDTO.Photo == null || photoUploadDTO.Photo.Length == 0)
                return BadRequest("Photo is required.");

            var uploadPath = Path.Combine(_hostEnvironment.WebRootPath, "uploads");
            Directory.CreateDirectory(uploadPath);

            var fileName = Guid.NewGuid().ToString() + Path.GetExtension(photoUploadDTO.Photo.FileName);
            var filePath = Path.Combine(uploadPath, fileName);

            using (var stream = new FileStream(filePath, FileMode.Create))
            {
                await photoUploadDTO.Photo.CopyToAsync(stream);
            }

            var photoModel = new PropertyPhoto
            {
                PropertyId = photoUploadDTO.PropertyId,
                UserId = photoUploadDTO.UserId,
                PhotoUrl = $"/uploads/{fileName}",
                PhotoName = photoUploadDTO.Photo.FileName
            };

            await _photoCollection.InsertOneAsync(photoModel);

            return Ok(photoModel);
        }

    }
}
