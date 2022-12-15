pool = require("../utils/db.js");

module.exports = {

  getBlankUsers(){ 
    return {
        "Users_ID": 0,
        "Users_created": 0,
        "Users_name": 0,
        "Users_mail": 0,
        "Users_phone": 0,
        "Users_address": 0,
        "Users_role": 0,
        "Users_passwords" : 0
    };
},

async getAllUsers(){ 
  try {
      let conn = await pool.getConnection();
      let sql = "SELECT * FROM Users";
      const rows = await conn.query(sql);
      conn.end();
      return rows;
  }
  catch (err) {
      console.log(err);
      throw err; 
  }
},

  async getOneUser(Users_ID) {
    try {
      let conn = await pool.getConnection();
      let sql = "SELECT Users_ID, Users_name,Users_mail,Users_phone,Users_address,Users_role FROM Users WHERE Users_ID = ?";
      const rows = await conn.query(sql, Users_ID);
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

  async getOnename(name) {
    try {
      let conn = await pool.getConnection();
      let sql = "SELECT Users_ID, Users_name,Users_mail,Users_phone,Users_address,Users_role FROM Users WHERE Users_name = ?";
      const rows = await conn.query(sql, name);
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

  
  
  async areValidCredentials(username, password) {
    try {
      let conn = await pool.getConnection();
      let sql = "SELECT * FROM Users WHERE Users_name = ? AND Users_passwords COLLATE utf8mb4_general_ci  = sha2(concat(Users_created, ?), 224) COLLATE utf8mb4_general_ci "; 
      const rows = await conn.query(sql, [username, password]);
      conn.end();
      if (rows.length == 1 && rows[0].Users_name === username) {
        return true;
      } else {
        return false;
      }
    } catch (err) {
      console.log(err);
      throw err;
    }
  },

  async delOneUser(username){ 
    try {
        let conn = await pool.getConnection();
        let sql = "DELETE FROM Users WHERE Users_ID = ?";
        const okPacket = await conn.query(sql,username); 
        conn.end();
        console.log(okPacket);
        return okPacket.affectedRows;
    }
    catch (err) {
        console.log(err);
        throw err; 
    }
},

async addOneUser(username){ 
    try {
        let conn = await pool.getConnection();
        let sql = "INSERT INTO Users (Users_ID,Users_name) VALUES (NULL,?)";
        const okPacket = await conn.query(sql,username); 
        conn.end();
        console.log(okPacket);
        return okPacket.insertId;
    }
    catch (err) {
        console.log(err);
        throw err; 
    }
},

async editOneUser(Users_ID, Users_name, Users_mail, Users_phone, Users_address,Users_passwords){ 
    try {
        let conn = await pool.getConnection();
        let sql = "UPDATE Users SET Users_name=?, Users_mail=?, Users_phone=?, Users_address=?, Users_passwords = ? WHERE Users_ID=? ";
        const okPacket = await conn.query(sql,[Users_name, Users_mail, Users_phone, Users_address,Users_passwords, Users_ID]);
        conn.end();
        console.log(okPacket);
        return okPacket.affectedRows;
    }
    catch (err) {
        console.log(err);
        throw err; 
    }
  }
};