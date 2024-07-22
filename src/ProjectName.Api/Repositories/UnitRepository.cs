using System.Collections.Generic;
using System.Data;
using System.Threading.Tasks;
using Oracle.ManagedDataAccess.Client;
using Dapper;
using ProjectName.Api.Models;

namespace ProjectName.Api.Repositories
{
    public class UnitRepository
    {
        private readonly string _connectionString;

        public UnitRepository(string connectionString)
        {
            _connectionString = connectionString;
        }

        public async Task<List<Lov>> GetLovForUnitId(int globalParameter)
        {
            using (IDbConnection db = new OracleConnection(_connectionString))
            {
                string query = globalParameter == 0 ? 
                    "SELECT UNIQUE SEGMENT_CODE AS Code, SEGMENT_NAME AS Name FROM MES_UNIT_MASTER ORDER BY 1 ASC" : 
                    "SELECT UNIQUE B.UNIT_ID AS Code, A.SEGMENT_NAME AS Name FROM MES_UNIT_MASTER A, HPM_PART_MASTER B WHERE B.UNIT_ID = A.SEGMENT_CODE ORDER BY 1 ASC";

                var result = await db.QueryAsync<Lov>(query);
                return result.AsList();
            }
        }

        public async Task<bool> ValidateUnitId(int globalParameter, string unitId, string unitName)
        {
            using (IDbConnection db = new OracleConnection(_connectionString))
            {
                string query = globalParameter == 0 ? 
                    "SELECT COUNT(*) FROM (SELECT UNIQUE SEGMENT_CODE, SEGMENT_NAME FROM MES_UNIT_MASTER WHERE SEGMENT_CODE = :UNIT_ID AND SEGMENT_NAME = :UNIT_NAME)" : 
                    "SELECT COUNT(*) FROM (SELECT UNIQUE B.UNIT_ID SEGMENT_CODE, A.SEGMENT_NAME FROM MES_UNIT_MASTER A, HPM_PART_MASTER B WHERE B.UNIT_ID = A.SEGMENT_CODE AND B.UNIT_ID = :UNIT_ID AND A.SEGMENT_NAME = :UNIT_NAME)";

                var count = await db.ExecuteScalarAsync<int>(query, new { UNIT_ID = unitId, UNIT_NAME = unitName });
                return count > 0;
            }
        }
    }
}
