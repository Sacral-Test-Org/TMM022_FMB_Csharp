using ProjectName.Api.DTOs;

namespace ProjectName.Api.Interfaces
{
    public interface IPartService
    {
        bool CheckPartExists(PartDto partDto);
        void SavePart(PartDto partDto);
        void UpdatePart(PartDto partDto);
        bool ValidateLineId(string lineId, string lineDesc);
    }
}