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
    public class ExperiencesRepository : IRepository<Experience>
    {
        private readonly IConfiguration _configuration;

        public ExperiencesRepository(IConfiguration configuration)
        {
            _configuration = configuration;
        }

        public List<Experience> ListAll()
        {
            var query = "SELECT * FROM Experience;";

            try
            {
                using var conn = new SqlConnection(_configuration.GetConnectionString("DefaultConnection"));

                return conn.Query<Experience>(query).ToList();
            }
            catch (Exception ex)
            {
                Console.WriteLine($"Erro ao comunicar com banco. \n\nMessage: {ex.Message} \n\nTarget Site: {ex.TargetSite} \n\nStack Trace: {ex.StackTrace}");
                throw;
            }
        }

        public List<Experience> ListAllByUserId(long userId)
        {
            var query = "SELECT * FROM Experience WHERE userId=@userId;";

            var parameters = new DynamicParameters();
            parameters.Add("userId", userId);

            try
            {
                using var conn = new SqlConnection(_configuration.GetConnectionString("DefaultConnection"));

                return conn.Query<Experience>(query, parameters).ToList();
            }
            catch (Exception ex)
            {
                Console.WriteLine($"Erro ao comunicar com banco. \n\nMessage: {ex.Message} \n\nTarget Site: {ex.TargetSite} \n\nStack Trace: {ex.StackTrace}");
                throw;
            }
        }
        public bool Insert(Experience experience)
        {
            var query = "INSERT INTO Experience VALUES (@userId,@experienceType, @title, @initialDate, @finalDate, @expDescription);";

            var parameters = new DynamicParameters(experience);

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

        public bool Update(long id, Experience experience)
        {
            var query = "UPDATE Experience SET userId=@userId, experienceType=@experienceType, title=@title, initialDate=@initialDate, finalDate=@finalDate, expDescription=@expDescription  WHERE experienceId=@experienceId;";

            experience.ExperienceId = id;
            var parameters = new DynamicParameters(experience);

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
            var query = "DELETE FROM Experience WHERE experienceId=@id;";

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
