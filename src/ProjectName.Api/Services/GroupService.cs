using System.Collections.Generic;
using ProjectName.Api.DTOs;
using ProjectName.Api.Repositories;

namespace ProjectName.Api.Services
{
    public class GroupService
    {
        private readonly GroupRepository _groupRepository;

        public GroupService(GroupRepository groupRepository)
        {
            _groupRepository = groupRepository;
        }

        public List<GroupDto> GetGroupIds(int globalParameter)
        {
            return _groupRepository.GetGroupIds(globalParameter);
        }

        public bool ValidateGroupId(int globalParameter, string groupId, string groupName)
        {
            return _groupRepository.ValidateGroupId(globalParameter, groupId, groupName);
        }
    }
}