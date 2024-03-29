using MongoDB.Driver;
using System;
using System.ComponentModel.DataAnnotations;
namespace test.Dtos
{
    public class RegisterResponse
    {
        public string Message { get; set; } = string.Empty;
        public bool Success { get; set; }
        public string Role { get; set; } = string.Empty;
    }
}

