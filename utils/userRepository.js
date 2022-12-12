pool = require("../utils/db.js");

module.exports = {
  async getOneUser(Users_name) {
    try {
      let conn = await pool.getConnection();
      let sql = "SELECT Users_ID, Users_name,Users_mail,Users_phone,Users_address,Users_role, FROM Users WHERE Users_ID = ?,"; // must leave out the password+hash
      const rows = await conn.query(sql, Users_name);
      conn.end();

      if (rows.length == 1) {
        return rows[0];
      } else {
        return false;
      }
    } catch (err) {
      console.log(err);
      throw err;
    }
  },
  
  async areValidCredentials(User_name, password) {
    try {
      let conn = await pool.getConnection();
      let sql = "SELECT * FROM Users WHERE Users_name = '?' AND Users_passwords COLLATE utf8mb4_general_ci  = sha2(concat(Users_created, '?'), 224) COLLATE utf8mb4_general_ci "; 
      const rows = await conn.query(sql, [User_name, password]);
      conn.release();

      if (rows.length == 1 && rows[0].Users_name === User_name) {
        return true;
      } else {
        return false;
      }
    } catch (err) {
      console.log(err);
      throw err;
    }
  },
};