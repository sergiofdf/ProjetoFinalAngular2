namespace WorkingBees.Core.Interfaces
{
    public interface ITokenService
    {
        string GenerateToken(string nome, string permissao);
    }
}
