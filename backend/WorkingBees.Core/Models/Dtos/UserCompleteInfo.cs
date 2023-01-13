namespace WorkingBees.Core.Models
{
    public class UserCompleteInfo : UserInfo
    {
        public List<Skill> Skills { get; set; }
        public List<Experience> Experiences { get; set; }
        public List<SocialMediaInfo> SocialMediaInfos { get; set; }

        public UserCompleteInfo(long userId, string name, string phoneNumber, string email, string city, string state, string profileImageUrl, List<Skill> skills, List<Experience> experiences, List<SocialMediaInfo> socialMediaInfos)
        {
            UserId = userId;
            Name = name;
            PhoneNumber = phoneNumber;
            Email = email;
            City = city;
            State = state;
            ProfileImageUrl = profileImageUrl;
            Skills = skills;
            Experiences = experiences;
            SocialMediaInfos = socialMediaInfos;
        }
    }
}
