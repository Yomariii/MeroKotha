﻿namespace test.Dtos
{
    public class RentalRequest
    {
        public string Name { get; set; }
        public string Description { get; set; }
        public decimal Price { get; set; }
        public List<string> Photos { get; set; }
        public double Latitude { get; set; }
        public double Longitude { get; set; }
        public string FullName { get; set; }
           public string PhoneNumber { get; set; }
        public string Email { get; set; }
    }
}
