using Microsoft.AspNetCore.Identity;
using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Threading.Tasks;

namespace BinmakAPI.Entities
{
    public class ApplicationUser : IdentityUser
    {
        [Required]
        [MaxLength(50)]
        public string FirstName { get; set; }
        [Required]
        [MaxLength(50)]
        public string LastName { get; set; }
        public bool IsDeleted { get; set; }
        public bool IsAdmin { get; set; }
        public bool IsBinmak { get; set; }
        public string Address { get; set; }
        public string Address2 { get; set; }
        public string City { get; set; }
        public int CompanyId { get; set; }
        public int CountryId { get; set; }
        public int Zip { get; set; }
        public string Position { get; set; }
        public DateTime DateStamp { get; set; }
        public string Reference { get; set; }

    }
}
