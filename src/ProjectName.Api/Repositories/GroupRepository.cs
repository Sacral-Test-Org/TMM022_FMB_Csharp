using System.Collections.Generic;
using System.Data;
using System.Threading.Tasks;
using Dapper;
using Oracle.ManagedDataAccess.Client;
using ProjectName.Api.DTOs;
using ProjectName.Api.Models;

namespace ProjectName.Api.Repositories
{
    public class GroupRepository
    {
        private readonly string _connectionString;

        public GroupRepository(string connectionString)
        {
            _connectionString = connectionString;
        }

        public async Task<List<GroupDto>> GetGroupIds(int globalParameter, string unitId)
        {
            using (var connection = new OracleConnection(_connectionString))
            {
                string query = globalParameter == 0 ?
                    "SELECT UNIQUE GROUP_ID, GROUP_NAME FROM MES_GROUP_MASTER WHERE GROUP_STATUS='O' AND GROUP_SECTION=:UnitId ORDER BY 1 ASC" :
                    "SELECT UNIQUE B.GROUP_ID, A.GROUP_NAME FROM MES_GROUP_MASTER A, HPM_PART_MASTER B WHERE B.GROUP_ID=A.GROUP_ID AND B.UNIT_ID=:UnitId ORDER BY 1 ASC";

                var result = await connection.QueryAsync<GroupDto>(query, new { UnitId = unitId });
                return result.AsList();
            }
        }

        public async Task<bool> ValidateGroupId(int globalParameter, string groupId, string groupName, string unitId)
        {
            using (var connection = new OracleConnection(_connectionString))
            {
                string query = globalParameter == 0 ?
                    "SELECT COUNT(*) FROM (SELECT UNIQUE GROUP_ID, GROUP_NAME FROM MES_GROUP_MASTER WHERE GROUP_STATUS='O' AND GROUP_SECTION=:UnitId AND GROUP_ID=:GroupId AND GROUP_NAME=:GroupName)" :
                    "SELECT COUNT(*) FROM (SELECT UNIQUE B.GROUP_ID, A.GROUP_NAME FROM MES_GROUP_MASTER A, HPM_PART_MASTER B WHERE B.GROUP_ID=A.GROUP_ID AND B.UNIT_ID=:UnitId AND B.GROUP_ID=:GroupId AND A.GROUP_NAME=:GroupName)";

                int count = await connection.ExecuteScalarAsync<int>(query, new { UnitId = unitId, GroupId = groupId, GroupName = groupName });
                return count > 0;
            }
        }
    }
}
