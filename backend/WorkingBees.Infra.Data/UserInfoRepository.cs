using Dapper;
using Microsoft.Extensions.Configuration;
using System.Data.SqlClient;
using WorkingBees.Core.Interfaces;
using WorkingBees.Core.Models;

namespace WorkingBees.Infra.Data
{
    public class UserInfoRepository : IRepository<UserInfo>
    {
        private readonly IConfiguration _configuration;

        public UserInfoRepository(IConfiguration configuration)
        {
            _configuration = configuration;
        }

        public async Task<List<UserInfo>> ListAllAsync()
        {
            var query = "SELECT * FROM UserInfo;";

            try
            {
                using var conn = new SqlConnection(_configuration.GetConnectionString("DefaultConnection"));

                return (await conn.QueryAsync<UserInfo>(query)).ToList();
            }
            catch (Exception ex)
            {
                Console.WriteLine($"Erro ao comunicar com banco. \n\nMessage: {ex.Message} \n\nTarget Site: {ex.TargetSite} \n\nStack Trace: {ex.StackTrace}");
                throw;
            }
        }

        public async Task<List<UserInfo>> ListAllByUserIdAsync(long userId)
        {
            var query = "SELECT * FROM UserInfo WHERE userId=@userId;";

            var parameters = new DynamicParameters();
            parameters.Add("userId", userId);

            try
            {
                using var conn = new SqlConnection(_configuration.GetConnectionString("DefaultConnection"));

                return (await conn.QueryAsync<UserInfo>(query, parameters)).ToList();
            }
            catch (Exception ex)
            {
                Console.WriteLine($"Erro ao comunicar com banco. \n\nMessage: {ex.Message} \n\nTarget Site: {ex.TargetSite} \n\nStack Trace: {ex.StackTrace}");
                throw;
            }
        }
        public async Task<bool> InsertAsync(UserInfo user)
        {
            var query = "INSERT INTO UserInfo VALUES (@name, @phoneNumber, @email, @city, @state, @profileImageUrl, @userRole);";

            var parameters = new DynamicParameters(user);

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

        public async Task<bool> UpdateAsync(long id, UserInfo user)
        {
            var query = "UPDATE UserInfo SET name=@name, phoneNumber=@phoneNumber, email=@email, city=@city, state=@state, profileImageUrl=@profileImageUrl, userRole=@userRole WHERE userId=@userId;";

            user.UserId = id;
            var parameters = new DynamicParameters(user);

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
            var query = "DELETE FROM UserInfo WHERE userId=@id;";

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
