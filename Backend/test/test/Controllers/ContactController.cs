using Microsoft.AspNetCore.Mvc;
using MongoDB.Driver;
using System;
using System.Threading.Tasks;
using test.Models;
using test.Dtos;

namespace test.Controllers
{
    [Route("api/contact")]
    [ApiController]
    public class ContactController : ControllerBase
    {
        private readonly IMongoDatabase _database;

        public ContactController(IMongoDatabase database)
        {
            _database = database;
        }

        [HttpPost]
        public async Task<IActionResult> PostContactMessage(ContactMessageDto messageDto)
        {
            if (messageDto == null)
            {
                return BadRequest("Invalid message data");
            }

            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }

            var message = new ContactMessage
            {
                Name = messageDto.Name,
                Email = messageDto.Email,
                Message = messageDto.Message
            };

            try
            {
                var collection = _database.GetCollection<ContactMessage>("contact_messages");
                await collection.InsertOneAsync(message);
                return Ok(new { success = true, message = "Message saved successfully" });
            }
            catch (Exception ex)
            {
                // Log the exception
                Console.WriteLine($"Error saving message: {ex.Message}");
                return StatusCode(500, new { success = false, message = "An error occurred while saving the message" });
            }
        }

        [HttpGet]
        public async Task<IActionResult> GetContactMessages()
        {
            try
            {
                var collection = _database.GetCollection<ContactMessage>("contact_messages");
                var messages = await collection.Find(_ => true).ToListAsync();
                return Ok(messages);
            }
            catch (Exception ex)
            {
                // Log the exception
                Console.WriteLine($"Error retrieving messages: {ex.Message}");
                return StatusCode(500, new { success = false, message = "An error occurred while retrieving the messages" });
            }
        }
    }
}
