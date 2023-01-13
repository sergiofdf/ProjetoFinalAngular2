using System;
using System.Collections.Generic;
using System.Data.SqlClient;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using Dapper;
using Microsoft.Extensions.Configuration;
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

        public List<SocialMediaInfo> ListAll()
        {
            var query = "SELECT * FROM SocialMediaInfo;";

            try
            {
                using var conn = new SqlConnection(_configuration.GetConnectionString("DefaultConnection"));

                return conn.Query<SocialMediaInfo>(query).ToList();
            }
            catch (Exception ex)
            {
                Console.WriteLine($"Erro ao comunicar com banco. \n\nMessage: {ex.Message} \n\nTarget Site: {ex.TargetSite} \n\nStack Trace: {ex.StackTrace}");
                throw;
            }
        }

        public List<SocialMediaInfo> ListAllByUserId(long userId)
        {
            var query = "SELECT * FROM SocialMediaInfo WHERE userId=@userId;";

            var parameters = new DynamicParameters();
            parameters.Add("userId", userId);

            try
            {
                using var conn = new SqlConnection(_configuration.GetConnectionString("DefaultConnection"));

                return conn.Query<SocialMediaInfo>(query, parameters).ToList();
            }
            catch (Exception ex)
            {
                Console.WriteLine($"Erro ao comunicar com banco. \n\nMessage: {ex.Message} \n\nTarget Site: {ex.TargetSite} \n\nStack Trace: {ex.StackTrace}");
                throw;
            }
        }
        public bool Insert(SocialMediaInfo socialMediaInfo)
        {
            var query = "INSERT INTO SocialMediaInfo VALUES (@userId,@facebookUrl, @instagramUrl, @githubUrl, @linkedinUrl);";

            var parameters = new DynamicParameters(socialMediaInfo);

            try
            {
                using var conn = new SqlConnection(_configuration.GetConnectionString("DefaultConnection"));

                return conn.Execute(query, parameters) == 1;
            }
            catch (Exception ex)
            {
                Console.WriteLine($"Erro ao comunicar com banco. \n\nMessage: {ex.Message} \n\nTarget Site: {ex.TargetSite} \n\nStack Trace: {ex.StackTrace}");
                throw;
            }
        }

        public bool Update(long id, SocialMediaInfo socialMediaInfo)
        {
            var query = "UPDATE SocialMediaInfo SET userId=@userId, facebookUrl=@facebookUrl, instagramUrl=@instagramUrl, githubUrl=@githubUrl, linkedinUrl=@linkedinUrl WHERE socialMediaInfoId=@socialMediaInfoId;";

            socialMediaInfo.SocialMediaInfoId = id;
            var parameters = new DynamicParameters(socialMediaInfo);

            try
            {
                using var conn = new SqlConnection(_configuration.GetConnectionString("DefaultConnection"));

                return conn.Execute(query, parameters) == 1;
            }
            catch (Exception ex)
            {
                Console.WriteLine($"Erro ao comunicar com banco. \n\nMessage: {ex.Message} \n\nTarget Site: {ex.TargetSite} \n\nStack Trace: {ex.StackTrace}");
                throw;
            }
        }
        public bool Delete(long id)
        {
            var query = "DELETE FROM SocialMediaInfo WHERE socialMediaInfoId=@id;";

            var parameters = new DynamicParameters();
            parameters.Add("id", id);

            try
            {
                using var conn = new SqlConnection(_configuration.GetConnectionString("DefaultConnection"));

                return conn.Execute(query, parameters) == 1;
            }
            catch (Exception ex)
            {
                Console.WriteLine($"Erro ao comunicar com banco. \n\nMessage: {ex.Message} \n\nTarget Site: {ex.TargetSite} \n\nStack Trace: {ex.StackTrace}");
                throw;
            }
        }
    }
}
