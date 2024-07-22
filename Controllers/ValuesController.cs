using System;
using System.Collections.Generic;
using System.Data;
using System.Data.SqlClient;
using System.Configuration;
using StoredProcedureWithWebAPI.Models;
using System.Web.Http;
using System.Web.Http.Cors;

namespace StoredProcedureswithwebapi.Controllers
{
   
    public class ValuesController : ApiController
    {
        SqlConnection con = new SqlConnection(ConfigurationManager.ConnectionStrings["webapi_conn"].ConnectionString);

        // GET api/values
        [HttpGet]
        [Route("api/values/User")]
        public List<UserModel> Get()
        {
            SqlDataAdapter da = new SqlDataAdapter("GetUser2", con);
            da.SelectCommand.CommandType = CommandType.StoredProcedure;
            DataTable dt = new DataTable();
            da.Fill(dt);
            List<UserModel> userList = new List<UserModel>();

            if (dt.Rows.Count > 0)
            {
                foreach (DataRow row in dt.Rows)
                {
                    UserModel user = new UserModel
                    {
                        ID = Convert.ToInt32(row["ID"]),
                        Username = row["Username"].ToString(),
                        Email = row["Email"].ToString(),
                        Phone_number = Convert.ToInt64(row["Phone_number"]),
                        Department = row["Department"].ToString()
                    };

                    // Check for DBNull before casting to byte[]
                    if (row["Photo"] != DBNull.Value)
                    {
                        user.Photo = row["Photo"].ToString();
                    }

                    userList.Add(user);
                }
            }

            return userList;
        }


        [HttpPost]
        [Route("api/values/User")]
        public IHttpActionResult PostUser(UserModel user)
        {
            if (user == null)
            {
                return BadRequest("Invalid user data");
            }

            try
            {
                using (SqlCommand cmd = new SqlCommand("AddUser2", con))
                {
                    cmd.CommandType = CommandType.StoredProcedure;

                    cmd.Parameters.AddWithValue("@Username", user.Username);
                    cmd.Parameters.AddWithValue("@Password", user.Password);
                    cmd.Parameters.AddWithValue("@Email", user.Email);
                    cmd.Parameters.AddWithValue("@Phone_number", user.Phone_number);
                    cmd.Parameters.AddWithValue("@Department", user.Department);
                    cmd.Parameters.AddWithValue("@Photo", user.Photo);
                    cmd.CommandTimeout = 300;
                    con.Open();
                    int rowsAffected = cmd.ExecuteNonQuery();
                    con.Close();

                    if (rowsAffected > 0)
                    {
                        return Ok("User added successfully");
                    }
                    else
                    {
                        return BadRequest("Error adding user");
                    }
                }
            }
            catch (Exception ex)
            {
                return InternalServerError(ex);
            }
        }

        // Other methods (Post, Put, Delete) can be modified in a similar fashion
    }
    public class DepartmentController : ApiController
    {
        SqlConnection cona = new SqlConnection(ConfigurationManager.ConnectionStrings["webapi_conn"].ConnectionString);

        // GET api/values
        [HttpGet]
        [Route("api/values/Department")]
        public List<DepartmentModel> GetDepartmentList()
        {
            SqlDataAdapter db = new SqlDataAdapter("GetDepartment", cona);
            db.SelectCommand.CommandType = CommandType.StoredProcedure;
            DataTable dta = new DataTable();
            db.Fill(dta);
            List<DepartmentModel> departmentList = new List<DepartmentModel>();

            if (dta.Rows.Count > 0)
            {
                foreach (DataRow row in dta.Rows)
                {
                    DepartmentModel department = new DepartmentModel
                    {
                        DepartmentID = Convert.ToInt32(row["DepartmentID"]),
                        Name = row["Name"].ToString(),
                        DepartmentNumber = row["DepartmentNumber"].ToString(),
                        TotalVehicles = Convert.ToInt32(row["TotalVehicles"]),
                        CompanyName = row["CompanyName"].ToString(),
                        DepartmentType = row["DepartmentType"].ToString(),
                        CreatedDate = Convert.ToDateTime(row["CreatedDate"])
                    };

                    departmentList.Add(department);
                }
            }

            return departmentList;
        }

        [HttpPost]
        [Route("api/values/Department")]
        public IHttpActionResult PostDepartment(DepartmentModel department)
        {
            if (department == null)
            {
                return BadRequest("Invalid department data");
            }

            try
            {
                using (SqlCommand cmd = new SqlCommand("AddDepartment", cona))
                {
                    cmd.CommandType = CommandType.StoredProcedure;

                    cmd.Parameters.AddWithValue("@Name", department.Name);
                    cmd.Parameters.AddWithValue("@DepartmentNumber", department.DepartmentNumber);
                    cmd.Parameters.AddWithValue("@TotalVehicles", department.TotalVehicles);
                    cmd.Parameters.AddWithValue("@CompanyName", department.CompanyName);
                    cmd.Parameters.AddWithValue("@DepartmentType", department.DepartmentType);
                    cmd.Parameters.AddWithValue("@CreatedDate", department.CreatedDate);

                    cona.Open();
                    int rowsAffected = cmd.ExecuteNonQuery();
                    cona.Close();

                    if (rowsAffected > 0)
                    {
                        return Ok("Department added successfully");
                    }
                    else
                    {
                        return BadRequest("Error adding department");
                    }
                }
            }
            catch (Exception ex)
            {
                return InternalServerError(ex);
            }
        }

       
        // Other methods (Post, Put, Delete) can be modified in a similar fashion
    }

    public class TransactionController : ApiController
    {
        SqlConnection cone = new SqlConnection(ConfigurationManager.ConnectionStrings["webapi_conn"].ConnectionString);
        // GET api/values/Transactions
        [HttpGet]
        [Route("api/values/Transactions")]
        public List<TransactionModel> GetTransactions()
        {
            SqlDataAdapter dbt = new SqlDataAdapter("GetTransaction", cone);
            dbt.SelectCommand.CommandType = CommandType.StoredProcedure;
            DataTable kt = new DataTable();
            dbt.Fill(kt);
            List<TransactionModel> transactionList = new List<TransactionModel>();
            foreach (DataRow row in kt.Rows)
            {
                TransactionModel transaction = new TransactionModel
                {
                    TransactionID = Convert.ToInt32(row["TransactionID"]),
                    StartTime = Convert.ToDateTime(row["StartTime"]),
                    EndTime = Convert.ToDateTime(row["EndTime"]),
                    VehicleName = row["VehicleName"].ToString(),
                    Department = row["Department"].ToString(),
                    VehicleNumber = row["VehicleNumber"].ToString()
                };
                transactionList.Add(transaction);
            }
            return transactionList;
        }
        // POST api/values/Transactions
        [HttpPost]
        [Route("api/values/Transactions")]
        public IHttpActionResult PostTransaction(TransactionModel transaction)
        {
            if (transaction == null)
            {
                return BadRequest("Invalid transaction data");
            }

            try
            {
                using (SqlCommand cmd = new SqlCommand("AddTransaction", cone))
                {
                    cmd.CommandType = CommandType.StoredProcedure;

                    cmd.Parameters.AddWithValue("@StartTime", transaction.StartTime);
                    cmd.Parameters.AddWithValue("@EndTime", transaction.EndTime);
                    cmd.Parameters.AddWithValue("@VehicleName", transaction.VehicleName);
                    cmd.Parameters.AddWithValue("@Department", transaction.Department);
                    cmd.Parameters.AddWithValue("@VehicleNumber", transaction.VehicleNumber);

                    cone.Open();
                    int rowsAffected = cmd.ExecuteNonQuery();
                    cone.Close();

                    if (rowsAffected > 0)
                    {
                        return Ok("Transaction added successfully");
                    }
                    else
                    {
                        return BadRequest("Error adding transaction");
                    }
                }
            }
            catch (Exception ex)
            {
                return InternalServerError(ex);
            }
        }

    }


}
