using Microsoft.AspNetCore.Mvc;
using ProjectName.Api.Services;
using ProjectName.Api.DTOs;
using System.Collections.Generic;

namespace ProjectName.Api.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    public class GroupController : ControllerBase
    {
        private readonly IGroupService _groupService;

        public GroupController(IGroupService groupService)
        {
            _groupService = groupService;
        }

        [HttpGet("GetGroupIds")]
        public ActionResult<List<GroupDto>> GetGroupIds(int globalParameter)
        {
            var groupIds = _groupService.GetGroupIds(globalParameter);
            return Ok(groupIds);
        }

        [HttpPost("ValidateGroupId")]
        public ActionResult<bool> ValidateGroupId(int globalParameter, string groupId, string groupName)
        {
            var isValid = _groupService.ValidateGroupId(globalParameter, groupId, groupName);
            if (!isValid)
            {
                return BadRequest("Invalid Group ID or Group Name.");
            }
            return Ok(isValid);
        }
    }
}