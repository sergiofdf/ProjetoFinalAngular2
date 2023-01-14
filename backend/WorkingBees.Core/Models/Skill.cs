using System.ComponentModel.DataAnnotations;

namespace WorkingBees.Core.Models
{
    public class Skill
    {
        public long UserId { get; set; }
        [Key]
        public long SkillId { get; set; }
        [Required(ErrorMessage = "Tipo obrigatório.")]
        public string? SkillType { get; set; }
        [Required(ErrorMessage = "Título obrigatório.")]
        public string? Title { get; set; }
        [Required(ErrorMessage = "Nível obrigatório.")]
        public int ProgressLevel { get; set; }
    }
}
