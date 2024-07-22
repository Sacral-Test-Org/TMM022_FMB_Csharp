using Microsoft.AspNetCore.Mvc;
using ProjectName.Api.Services;
using ProjectName.Api.DTOs;
using System.Collections.Generic;

namespace ProjectName.Api.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    public class UnitController : ControllerBase
    {
        private readonly IUnitService _unitService;

        public UnitController(IUnitService unitService)
        {
            _unitService = unitService;
        }

        [HttpGet("GetLovForUnitId")]
        public IActionResult GetLovForUnitId(int globalParameter)
        {
            List<Lov> lovList = _unitService.GetLovForUnitId(globalParameter);
            return Ok(lovList);
        }

        [HttpPost("ValidateUnitId")]
        public IActionResult ValidateUnitId(int globalParameter, string unitId, string unitName)
        {
            bool isValid = _unitService.ValidateUnitId(globalParameter, unitId, unitName);
            if (isValid)
            {
                return Ok();
            }
            else
            {
                return BadRequest("Invalid Unit ID or Unit Name");
            }
        }
    }
}