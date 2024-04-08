namespace test.Dtos
{
    public class PropertySearchDto
    {
        public string Type { get; set; }
        public string Name { get; set; }
        public decimal? MinPrice { get; set; }
        public decimal? MaxPrice { get; set; }
    }
}
