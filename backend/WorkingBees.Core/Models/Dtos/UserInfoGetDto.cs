using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace WorkingBees.Core.Models.Dtos
{
    public class UserInfoGetDto
    {
        [Key]
        public long UserId { get; set; }
        [Required(ErrorMessage = "Nome obrigatório.")]
        public string? Name { get; set; }
        [Required(ErrorMessage = "Telefone obrigatório.")]
        public string? PhoneNumber { get; set; }
        [Required(ErrorMessage = "Email obrigatório.")]
        public string? Email { get; set; }
        [Required(ErrorMessage = "Cidade obrigatório.")]
        public string? City { get; set; }
        [Required(ErrorMessage = "Estado obrigatória.")]
        public string? State { get; set; }
        [Required(ErrorMessage = "Endereço de imagem obrigatória.")]
        public string? ProfileImageUrl { get; set; }
        [Required(ErrorMessage = "Nível de permissão obrigatória.")]
        public string? UserRole { get; set; }
    }
}
