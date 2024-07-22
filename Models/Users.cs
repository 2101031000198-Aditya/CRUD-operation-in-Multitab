using System;

namespace StoredProcedureWithWebAPI.Models
{
    public class UserModel
    {
        public int ID { get; set; }
        public string Username { get; set; }
        public string Password { get; set; }
        public string Email { get; set; }
        public long Phone_number { get; set; }
        public string Department { get; set; }
        public string Photo { get; set; } // Add this property for storing binary image data
    }


    public class DepartmentModel
    {
        public int DepartmentID { get; set; }
        public string Name { get; set; }
        public string DepartmentNumber { get; set; }
        public int TotalVehicles { get; set; }
        public string CompanyName { get; set; }
        public string DepartmentType { get; set; }
        public DateTime CreatedDate { get; set; }

       // public string Photo { get; set; }
    }

    public class TransactionModel
    {
        public int TransactionID { get; set; }
        public DateTime StartTime { get; set; }
        public DateTime EndTime { get; set; }
        public string VehicleName { get; set; }
        public string Department { get; set; }
        public string VehicleNumber { get; set; }
    }

}