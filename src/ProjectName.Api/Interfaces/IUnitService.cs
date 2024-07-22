using System.Collections.Generic;

namespace ProjectName.Api.Interfaces
{
    public interface IUnitService
    {
        List<Lov> GetLovForUnitId(int globalParameter);
        bool ValidateUnitId(int globalParameter, string unitId, string unitName);
    }

    public class Lov
    {
        public string SegmentCode { get; set; }
        public string SegmentName { get; set; }
    }
}