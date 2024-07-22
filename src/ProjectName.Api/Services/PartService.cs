using ProjectName.Api.Repositories;
using ProjectName.Api.Interfaces;
using ProjectName.Api.DTOs;
using ProjectName.Api.Models;

namespace ProjectName.Api.Services
{
    public class PartService : IPartService
    {
        private readonly PartRepository _partRepository;

        public PartService(PartRepository partRepository)
        {
            _partRepository = partRepository;
        }

        public bool CheckPartExists(PartDto partDto)
        {
            var part = new Part
            {
                UnitId = partDto.UnitId,
                GroupId = partDto.GroupId,
                LineId = partDto.LineId,
                PartNo = partDto.PartNo
            };
            return _partRepository.CheckPartExists(part);
        }

        public void SavePart(PartDto partDto)
        {
            var part = new Part
            {
                UnitId = partDto.UnitId,
                GroupId = partDto.GroupId,
                LineId = partDto.LineId,
                PartNo = partDto.PartNo,
                PartId = partDto.PartId,
                PartStatus = partDto.PartStatus,
                PartDesc = partDto.PartDesc
            };
            _partRepository.InsertPart(part);
        }

        public void UpdatePart(PartDto partDto)
        {
            var part = new Part
            {
                UnitId = partDto.UnitId,
                GroupId = partDto.GroupId,
                LineId = partDto.LineId,
                PartNo = partDto.PartNo,
                PartId = partDto.PartId,
                PartStatus = partDto.PartStatus,
                PartDesc = partDto.PartDesc
            };
            _partRepository.UpdatePart(part);
        }

        public bool ValidateLineId(string lineId, string lineDesc)
        {
            return _partRepository.ValidateLineId(lineId, lineDesc);
        }
    }
}