pool = require("../utils/db.js");
// JS include = relative to CONTROLLERS 
// VIEW include = relative to VIEWS
module.exports = {
    getBlankOrders(){ // defines the entity model
        return {
            "Order_ID": 0,
            "Orders_product_ID": 0,
            "Name_of_product": "XXXXX",
            "Orders_adress": "XXXX",
            "Orders_payment": "XXXXX",
            "Number_of_product": 0,
            "order_date":"XX/XX/XXXX",
            "Users_ID":0,
        };
    },
    async getAllOrders(){ // TODO? move to brands.repository.js
        try {
            let conn = await pool.getConnection();
            let sql = "SELECT * FROM Orders";
            const rows = await conn.query(sql);
            conn.end();
            return rows;
        }
        catch (err) {
            // TODO: log/send error ... 
            console.log(err);
            throw err; // return false ???
        }
    },
    
    async getOneOrders(Order_ID){ 
        try {
            let conn = await pool.getConnection();
            let sql = "SELECT * FROM Orders  WHERE Order_ID=?";
            const rows = await conn.query(sql, Order_ID);
            conn.end();
            console.log("ROWS FETCHED: "+rows.length);
            if (rows.length == 1) {
                return rows[0];
            } else {
                return false;
            }
        }
        catch (err) {
            console.log(err);
            throw err; 
        }
    },

       async getOneUsersOrders(Users_ID){ 
        try {
            let conn = await pool.getConnection();
            let sql = "SELECT * FROM Orders  WHERE Users_ID=?";
            const rows = await conn.query(sql, Users_ID);
            conn.end();
            console.log("ROWS FETCHED: "+rows.length);
            if (rows.length == 1) {
                return rows[0];
            } else {
                return false;
            }
        }
        catch (err) {
            console.log(err);
            throw err; 
        }

    },
    async delOneOrder(Order_ID){ 
        try {
            let conn = await pool.getConnection();
            let sql = "DELETE FROM Orders WHERE Order_ID = ?";
            const okPacket = await conn.query(sql, Order_ID); // affectedRows, insertId
            conn.end();
            console.log(okPacket);
            return okPacket.affectedRows;
        }
        catch (err) {
            console.log(err);
            throw err; 
        }
    },
    async addOneOrder(Order_ID, Orders_product_ID, Orders_adress,Orders_payment,Number_of_product,order_date,Users_ID){ 
        try {
            let conn = await pool.getConnection();
            let sql = "INSERT INTO Orders (Orders_product_ID,Name_of_product,Orders_adress,Orders_payment,Number_of_product,order_date,Users_ID) VALUES (?,?,NULL,,NULL,?,'0/0/0000',?)";
            const okPacket = await conn.query(sql, Order_ID, Orders_product_ID, Orders_adress,Orders_payment,Number_of_product,order_date,Users_ID); // affectedRows, insertId
            conn.end();
            console.log(okPacket);
            return okPacket.insertId;
        }
        catch (err) {
            console.log(err);
            throw err; 
        }
    },
    async editOneCar(Order_ID, Orders_product_ID, Orders_adress,Orders_payment,Number_of_product,order_date,Users_ID){ 
        try {
            let conn = await pool.getConnection();
            let sql = "UPDATE Orders SET Orders_product_ID= ?, Name_of_product = ?,Orders_adress=?, Orders_payment=?, Number_of_product= ?, order_date= ?,Users_ID= ? WHERE Order_ID= ?;"; // TODO: named parameters? :something
            const okPacket = await conn.query(sql,[Orders_product_ID, Orders_adress,Orders_payment,Number_of_product,order_date,Users_ID,Order_ID]);
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