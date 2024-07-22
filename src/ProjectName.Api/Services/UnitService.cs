using System.Collections.Generic;
using ProjectName.Api.Repositories;
using ProjectName.Api.DTOs;

namespace ProjectName.Api.Services
{
    public class UnitService
    {
        private readonly IUnitRepository unitRepository;

        public UnitService(IUnitRepository unitRepository)
        {
            this.unitRepository = unitRepository;
        }

        public List<Lov> GetLovForUnitId(int globalParameter)
        {
            return unitRepository.GetLovForUnitId(globalParameter);
        }

        public bool ValidateUnitId(int globalParameter, string unitId, string unitName)
        {
            return unitRepository.ValidateUnitId(globalParameter, unitId, unitName);
        }
    }
}