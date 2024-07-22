using ProjectName.Api.Models;

namespace ProjectName.Api.Interfaces
{
    public interface IPartRepository
    {
        bool CheckPartExists(Part part);
        void InsertPart(Part part);
        void UpdatePart(Part part);
        bool ValidateLineId(string lineId, string lineDesc);
    }
}