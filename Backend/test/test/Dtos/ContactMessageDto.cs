using System.ComponentModel.DataAnnotations;

namespace test.Dtos
{
    public class ContactMessageDto
    {
        public string Name { get; set; } = string.Empty;
        [Required, EmailAddress]
        public string Email { get; set; } = string.Empty;
        public string Message { get; set; } = string.Empty;
    }
}
