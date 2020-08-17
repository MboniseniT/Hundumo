using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace BinmakBackEnd.Entities
{
    public class AssetNode
    {
        public int AssetNodeId { get; set; }
        public int ParentAssetNodeId { get; set; }
        public int RootAssetNodeId { get; set; }
        public int AssetNodeTypeId { get; set; }
        public int Height { get; set; }
        public string Name { get; set; }
        public string Description { get; set; }
        public string Code { get; set; }
        public DateTime DateStamp { get; set; }
        public string Reference { get; set; }
        public DateTime LastEditedDate { get; set; }
        public string LastEditedBy { get; set; }
        public bool IsParentAddress { get; set; }
        public string Address { get; set; }
        public string Address2 { get; set; }
        public string City { get; set; }
        public int CountryId { get; set; }
        public int Zip { get; set; }
    }
}
