using System;

namespace BinmakBackEnd.Areas.Enums
{
    [AttributeUsage(AttributeTargets.Enum | AttributeTargets.Field)]
    public sealed class EnumDescriptionAttribute : Attribute
    {
        public string Description { get; set; }
        public EnumDescriptionAttribute(string description)
        {
            Description = description;
        }
    }
}
