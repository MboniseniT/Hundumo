﻿using BinmakAPI.Data;
using BinmakBackEnd.Areas.AssetHealth.Models.Local;
using System.Linq;

namespace BinmakBackEnd.Areas.AssetHealth.Models.Respositories
{
    public class MachineRepository : CrudRepository<Machine>
    {
        public readonly BinmakDbContext _context;
        public MachineRepository(BinmakDbContext context) : base(context)
        {
            _context = context;
        }

        public Machine FindByDeviceId(string deviceId) => _context.Machines.FirstOrDefault(a=>a.DeviceId.Equals(deviceId));
        public Pageable<Machine> FindBySensorConditionId(int id, Pagination pagination) =>
             new Pageable<Machine>(_context.Machines.Where(a => a.ConditionId == id), pagination.Page, pagination.Size);
        
    }
}
