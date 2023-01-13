using System.ComponentModel.DataAnnotations;

namespace WorkingBees.Core.Models
{
    public class SocialMediaInfo
    {
        public long SocialMediaInfoId { get; set; }
        [Key]
        public long UserId { get; set; }
        public string? FacebookUrl { get; set; }
        public string? InstagramUrl { get; set; }
        public string? GithubUrl { get; set; }
        public string? LinkedinUrl { get; set; }
    }
}
