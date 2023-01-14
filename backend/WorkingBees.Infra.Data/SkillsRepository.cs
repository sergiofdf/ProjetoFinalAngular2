using Dapper;
using Microsoft.Extensions.Configuration;
using System.Data.SqlClient;
using WorkingBees.Core.Interfaces;
using WorkingBees.Core.Models;

namespace WorkingBees.Infra.Data
{
    public class SkillsRepository : IRepository<Skill>
    {
        private readonly IConfiguration _configuration;

        public SkillsRepository(IConfiguration configuration)
        {
            _configuration = configuration;
        }

        public async Task<List<Skill>> ListAllAsync()
        {
            var query = "SELECT * FROM Skills;";

            try
            {
                using var conn = new SqlConnection(_configuration.GetConnectionString("DefaultConnection"));

                return (await conn.QueryAsync<Skill>(query)).ToList();
            }
            catch (Exception ex)
            {
                Console.WriteLine($"Erro ao comunicar com banco. \n\nMessage: {ex.Message} \n\nTarget Site: {ex.TargetSite} \n\nStack Trace: {ex.StackTrace}");
                throw;
            }
        }

        public async Task<List<Skill>> ListAllByUserIdAsync(long userId)
        {
            var query = "SELECT * FROM Skills WHERE userId=@userId;";

            var parameters = new DynamicParameters();
            parameters.Add("userId", userId);

            try
            {
                using var conn = new SqlConnection(_configuration.GetConnectionString("DefaultConnection"));

                return (await conn.QueryAsync<Skill>(query, parameters)).ToList();
            }
            catch (Exception ex)
            {
                Console.WriteLine($"Erro ao comunicar com banco. \n\nMessage: {ex.Message} \n\nTarget Site: {ex.TargetSite} \n\nStack Trace: {ex.StackTrace}");
                throw;
            }
        }
        public async Task<bool> InsertAsync(Skill skill)
        {
            var query = "INSERT INTO Skills VALUES (@userId,@skillType, @title, @progressLevel);";

            var parameters = new DynamicParameters(skill);

            try
            {
                using var conn = new SqlConnection(_configuration.GetConnectionString("DefaultConnection"));

                return (await conn.ExecuteAsync(query, parameters)) == 1;
            }
            catch (Exception ex)
            {
                Console.WriteLine($"Erro ao comunicar com banco. \n\nMessage: {ex.Message} \n\nTarget Site: {ex.TargetSite} \n\nStack Trace: {ex.StackTrace}");
                throw;
            }
        }

        public async Task<bool> UpdateAsync(long id, Skill skill)
        {
            var query = "UPDATE Skills SET userId=@userId, skillType=@skillType, title=@title, progressLevel=@progressLevel WHERE skillId=@skillId;";

            skill.SkillId = id;
            var parameters = new DynamicParameters(skill);

            try
            {
                using var conn = new SqlConnection(_configuration.GetConnectionString("DefaultConnection"));

                return (await conn.ExecuteAsync(query, parameters)) == 1;
            }
            catch (Exception ex)
            {
                Console.WriteLine($"Erro ao comunicar com banco. \n\nMessage: {ex.Message} \n\nTarget Site: {ex.TargetSite} \n\nStack Trace: {ex.StackTrace}");
                throw;
            }
        }
        public async Task<bool> DeleteAsync(long id)
        {
            var query = "DELETE FROM Skills WHERE skillId=@id;";

            var parameters = new DynamicParameters();
            parameters.Add("id", id);

            try
            {
                using var conn = new SqlConnection(_configuration.GetConnectionString("DefaultConnection"));

                return (await conn.ExecuteAsync(query, parameters)) == 1;
            }
            catch (Exception ex)
            {
                Console.WriteLine($"Erro ao comunicar com banco. \n\nMessage: {ex.Message} \n\nTarget Site: {ex.TargetSite} \n\nStack Trace: {ex.StackTrace}");
                throw;
            }
        }
    }
}
