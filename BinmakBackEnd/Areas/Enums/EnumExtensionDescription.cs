using System;
using System.Linq;
using System.Reflection;

namespace BinmakBackEnd.Areas.Enums
{
    public static class EnumExtensionDescription
    {
        public static string GetEnumDescription(this Enum value)
        {
            try
            {
                if (value == null)
                    throw new ArgumentNullException(nameof(value));

                string description = value.ToString();
                FieldInfo fieldInfo = value.GetType().GetField(description);
                EnumDescriptionAttribute[] attributes =
                    (EnumDescriptionAttribute[])fieldInfo.GetCustomAttributes(typeof(EnumDescriptionAttribute), false);

                if (attributes != null && attributes.Length > 0)
                    description = attributes[0].Description;
                return description;
            }
            catch (Exception)
            {
                return string.Empty;
            }
        }

        public static T GetValueFromDescription<T>(this string description)
        {
            Type type = typeof(T);
            if (!type.IsEnum) throw new InvalidOperationException();
            foreach (FieldInfo field in type.GetFields())
            {
                EnumDescriptionAttribute[] attribute = field.GetCustomAttributes(
                                                           typeof(EnumDescriptionAttribute)) as EnumDescriptionAttribute[];
                if (attribute != null && attribute.Any())
                {
                    if (attribute[0].Description.Equals(description))
                        return (T)field.GetValue(null);
                }
                else
                {
                    if (field.Name.Equals(description))
                        return (T)field.GetValue(null);
                }
            }
            throw new ArgumentException("Not found.", "description");

        }
    }
}
