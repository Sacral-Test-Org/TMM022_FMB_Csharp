using System.Data;
using Oracle.ManagedDataAccess.Client;
using ProjectName.Api.Models;
using ProjectName.Api.Interfaces;

namespace ProjectName.Api.Repositories
{
    public class PartRepository : IPartRepository
    {
        private readonly string _connectionString;

        public PartRepository(string connectionString)
        {
            _connectionString = connectionString;
        }

        public bool CheckPartExists(Part part)
        {
            using (var connection = new OracleConnection(_connectionString))
            {
                connection.Open();
                using (var command = new OracleCommand())
                {
                    command.Connection = connection;
                    command.CommandText = "SELECT COUNT(*) FROM HPM_PART_MASTER WHERE UNIT_ID=:UNIT_ID AND GROUP_ID=:GROUP_ID AND LINE_ID=:LINE_ID AND PARTNO=:PARTNO";
                    command.Parameters.Add(new OracleParameter("UNIT_ID", part.UnitId));
                    command.Parameters.Add(new OracleParameter("GROUP_ID", part.GroupId));
                    command.Parameters.Add(new OracleParameter("LINE_ID", part.LineId));
                    command.Parameters.Add(new OracleParameter("PARTNO", part.PartNo));

                    int count = Convert.ToInt32(command.ExecuteScalar());
                    return count > 0;
                }
            }
        }

        public void InsertPart(Part part)
        {
            using (var connection = new OracleConnection(_connectionString))
            {
                connection.Open();
                using (var command = new OracleCommand())
                {
                    command.Connection = connection;
                    command.CommandText = "INSERT INTO HPM_PART_MASTER (UNIT_ID, GROUP_ID, PARTNO, PART_ID, PART_STATUS, PART_DESC, LINE_ID) VALUES (:UNIT_ID, :GROUP_ID, :PARTNO, :PART_ID, :PART_STATUS, :PART_DESC, :LINE_ID)";
                    command.Parameters.Add(new OracleParameter("UNIT_ID", part.UnitId));
                    command.Parameters.Add(new OracleParameter("GROUP_ID", part.GroupId));
                    command.Parameters.Add(new OracleParameter("PARTNO", part.PartNo));
                    command.Parameters.Add(new OracleParameter("PART_ID", part.PartId));
                    command.Parameters.Add(new OracleParameter("PART_STATUS", part.PartStatus));
                    command.Parameters.Add(new OracleParameter("PART_DESC", part.PartDesc));
                    command.Parameters.Add(new OracleParameter("LINE_ID", part.LineId));

                    command.ExecuteNonQuery();
                }
            }
        }

        public void UpdatePart(Part part)
        {
            using (var connection = new OracleConnection(_connectionString))
            {
                connection.Open();
                using (var command = new OracleCommand())
                {
                    command.Connection = connection;
                    command.CommandText = "UPDATE HPM_PART_MASTER SET PART_STATUS=:PART_STATUS, PART_DESC=:PART_DESC WHERE UNIT_ID=:UNIT_ID AND GROUP_ID=:GROUP_ID AND LINE_ID=:LINE_ID AND PARTNO=:PARTNO AND PART_ID=:PART_ID";
                    command.Parameters.Add(new OracleParameter("PART_STATUS", part.PartStatus));
                    command.Parameters.Add(new OracleParameter("PART_DESC", part.PartDesc));
                    command.Parameters.Add(new OracleParameter("UNIT_ID", part.UnitId));
                    command.Parameters.Add(new OracleParameter("GROUP_ID", part.GroupId));
                    command.Parameters.Add(new OracleParameter("LINE_ID", part.LineId));
                    command.Parameters.Add(new OracleParameter("PARTNO", part.PartNo));
                    command.Parameters.Add(new OracleParameter("PART_ID", part.PartId));

                    command.ExecuteNonQuery();
                }
            }
        }

        public bool ValidateLineId(string lineId, string lineDesc)
        {
            using (var connection = new OracleConnection(_connectionString))
            {
                connection.Open();
                using (var command = new OracleCommand())
                {
                    command.Connection = connection;
                    command.CommandText = "SELECT COUNT(*) FROM HPM_LINE_MASTER WHERE LINE_ID=:LINE_ID AND LINE_DESC=:LINE_DESC";
                    command.Parameters.Add(new OracleParameter("LINE_ID", lineId));
                    command.Parameters.Add(new OracleParameter("LINE_DESC", lineDesc));

                    int count = Convert.ToInt32(command.ExecuteScalar());
                    return count > 0;
                }
            }
        }
    }
}