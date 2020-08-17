using BinmakAPI.Data;
using BinmakBackEnd.Models;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace BinmakBackEnd.Services
{
    public class AssetNodeService
    {
        private readonly BinmakDbContext _context;

        public AssetNodeService(BinmakDbContext context)
        {
            _context = context;
        }
        public List<AssetNodeVM> GetAssetNodeVMs(string reference)
        {
            var assetNodes = _context.AssetNodes.Where(a => a.Reference.Equals(reference)).OrderBy(a => a.Height).ToList();

            List<AssetNodeVM> assetNodesVM = new List<AssetNodeVM>();

            foreach (var item in assetNodes)
            {
                assetNodesVM.Add(new AssetNodeVM() { Code = item.Code, RootAssetNodeId = item.RootAssetNodeId, DateStamp = item.DateStamp, 
                    Name = item.Name + " ("+ _context.AssetNodeTypes.FirstOrDefault(id => id.AssetNodeTypeId == item.AssetNodeTypeId).AssetNodeTypeName +")", 
                    AssetNodeId = item.AssetNodeId, ParentAssetNodeId = item.ParentAssetNodeId, Reference = item.Reference, Height = item.Height, NodeId = item.AssetNodeId, 
                    NodeType = item.AssetNodeTypeId /*Type = 1 if organization*/ });
            }

            return assetNodesVM;
        }
    }
}
