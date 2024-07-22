using Microsoft.AspNetCore.Mvc;
using ProjectName.Api.DTOs;
using ProjectName.Api.Services;

namespace ProjectName.Api.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    public class PartController : ControllerBase
    {
        private readonly PartService _partService;

        public PartController(PartService partService)
        {
            _partService = partService;
        }

        [HttpPost("CheckPartExists")]
        public ActionResult<bool> CheckPartExists([FromBody] PartDto partDto)
        {
            if (partDto == null)
            {
                return BadRequest("Part data is required.");
            }

            var exists = _partService.CheckPartExists(partDto);
            return Ok(exists);
        }

        [HttpPost("SavePart")]
        public IActionResult SavePart([FromBody] PartDto partDto)
        {
            if (partDto == null)
            {
                return BadRequest("Part data is required.");
            }

            if (string.IsNullOrEmpty(partDto.PART_ID))
            {
                return BadRequest("PART_ID is required.");
            }

            if (string.IsNullOrEmpty(partDto.UNIT_NAME))
            {
                return BadRequest("UNIT_NAME is required.");
            }

            if (string.IsNullOrEmpty(partDto.GROUP_NAME))
            {
                return BadRequest("GROUP_NAME is required.");
            }

            if (string.IsNullOrEmpty(partDto.LINE_DESC))
            {
                return BadRequest("LINE_DESC is required.");
            }

            if (string.IsNullOrEmpty(partDto.PARTNO))
            {
                return BadRequest("PARTNO is required.");
            }

            if (string.IsNullOrEmpty(partDto.PART_DESC))
            {
                return BadRequest("PART_DESC is required.");
            }

            if (string.IsNullOrEmpty(partDto.PART_STATUS))
            {
                return BadRequest("PART_STATUS is required.");
            }

            var exists = _partService.CheckPartExists(partDto);
            if (exists)
            {
                return Conflict("Part already exists.");
            }

            _partService.SavePart(partDto);
            return Ok("Part saved successfully.");
        }

        [HttpPut("UpdatePart")]
        public IActionResult UpdatePart([FromBody] PartDto partDto)
        {
            if (partDto == null)
            {
                return BadRequest("Part data is required.");
            }

            if (string.IsNullOrEmpty(partDto.PART_ID))
            {
                return BadRequest("PART_ID is required.");
            }

            if (string.IsNullOrEmpty(partDto.UNIT_NAME))
            {
                return BadRequest("UNIT_NAME is required.");
            }

            if (string.IsNullOrEmpty(partDto.GROUP_NAME))
            {
                return BadRequest("GROUP_NAME is required.");
            }

            if (string.IsNullOrEmpty(partDto.LINE_DESC))
            {
                return BadRequest("LINE_DESC is required.");
            }

            if (string.IsNullOrEmpty(partDto.PARTNO))
            {
                return BadRequest("PARTNO is required.");
            }

            if (string.IsNullOrEmpty(partDto.PART_DESC))
            {
                return BadRequest("PART_DESC is required.");
            }

            if (string.IsNullOrEmpty(partDto.PART_STATUS))
            {
                return BadRequest("PART_STATUS is required.");
            }

            var exists = _partService.CheckPartExists(partDto);
            if (!exists)
            {
                return NotFound("Part does not exist.");
            }

            _partService.UpdatePart(partDto);
            return Ok("Part updated successfully.");
        }

        [HttpGet("ValidateLineId")]
        public ActionResult<bool> ValidateLineId([FromQuery] string lineId, [FromQuery] string lineDesc)
        {
            if (string.IsNullOrEmpty(lineId) || string.IsNullOrEmpty(lineDesc))
            {
                return BadRequest("Line ID and Line Description are required.");
            }

            var isValid = _partService.ValidateLineId(lineId, lineDesc);
            return Ok(isValid);
        }
    }
}
