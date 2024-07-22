using System.Collections.Generic;
using ProjectName.Api.DTOs;

namespace ProjectName.Api.Interfaces
{
    public interface IGroupRepository
    {
        List<GroupDto> GetGroupIds(int globalParameter);
        bool ValidateGroupId(int globalParameter, string groupId, string groupName);
    }
}