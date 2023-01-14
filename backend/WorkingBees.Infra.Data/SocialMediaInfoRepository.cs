using Dapper;
using Microsoft.Extensions.Configuration;
using System.Data.SqlClient;
using WorkingBees.Core.Interfaces;
using WorkingBees.Core.Models;

namespace WorkingBees.Infra.Data
{
    public class SocialMediaInfoRepository : IRepository<SocialMediaInfo>
    {
        private readonly IConfiguration _configuration;

        public SocialMediaInfoRepository(IConfiguration configuration)
        {
            _configuration = configuration;
        }

        public async Task<List<SocialMediaInfo>> ListAllAsync()
        {
            var query = "SELECT * FROM SocialMediaInfo;";

            try
            {
                using var conn = new SqlConnection(_configuration.GetConnectionString("DefaultConnection"));

                return (await conn.QueryAsync<SocialMediaInfo>(query)).ToList();
            }
            catch (Exception ex)
            {
                Console.WriteLine($"Erro ao comunicar com banco. \n\nMessage: {ex.Message} \n\nTarget Site: {ex.TargetSite} \n\nStack Trace: {ex.StackTrace}");
                throw;
            }
        }

        public async Task<List<SocialMediaInfo>> ListAllByUserIdAsync(long userId)
        {
            var query = "SELECT * FROM SocialMediaInfo WHERE userId=@userId;";

            var parameters = new DynamicParameters();
            parameters.Add("userId", userId);

            try
            {
                using var conn = new SqlConnection(_configuration.GetConnectionString("DefaultConnection"));

                return (await conn.QueryAsync<SocialMediaInfo>(query, parameters)).ToList();
            }
            catch (Exception ex)
            {
                Console.WriteLine($"Erro ao comunicar com banco. \n\nMessage: {ex.Message} \n\nTarget Site: {ex.TargetSite} \n\nStack Trace: {ex.StackTrace}");
                throw;
            }
        }
        public async Task<bool> InsertAsync(SocialMediaInfo socialMediaInfo)
        {
            var query = "INSERT INTO SocialMediaInfo VALUES (@userId,@facebookUrl, @instagramUrl, @githubUrl, @linkedinUrl);";

            var parameters = new DynamicParameters(socialMediaInfo);

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

        public async Task<bool> UpdateAsync(long id, SocialMediaInfo socialMediaInfo)
        {
            var query = "UPDATE SocialMediaInfo SET userId=@userId, facebookUrl=@facebookUrl, instagramUrl=@instagramUrl, githubUrl=@githubUrl, linkedinUrl=@linkedinUrl WHERE socialMediaInfoId=@socialMediaInfoId;";

            socialMediaInfo.SocialMediaInfoId = id;
            var parameters = new DynamicParameters(socialMediaInfo);

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
            var query = "DELETE FROM SocialMediaInfo WHERE socialMediaInfoId=@id;";

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
