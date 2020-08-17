using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace BinmakAPI.Models
{
    public class Register
    {
        public string FirstName { get; set; }
        public string LastName { get; set; }
        public DateTime DateStamp { get; set; }
        public string Password { get; set; }
        public string Email { get; set; }
        public string Position { get; set; }
        public string Reference { get; set; }
        public string CellNumber { get; set; }
    }
}
