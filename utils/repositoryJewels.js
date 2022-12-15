pool = require("../utils/db.js");

module.exports = {
    getBlankJewels(){ 
        return {
            "Jewel_ID": 0,
            "Jewel_material": "XXXX",
            "size": 0,
            "price": 0,
            "Jewel_name": "XXXX",
            "Stone": "XXXX",
            "Jewel_category": "XXXX",
            "Stock" : 0 
        };
    },
    async getAllJewels(){ 
        try {
            let conn = await pool.getConnection();
            let sql = "SELECT * FROM Jewels";
            const rows = await conn.query(sql);
            conn.end();
            return rows;
        }
        catch (err) {
            console.log(err);
            throw err; 
        }
    },
    
    async getOneMaterial(Jewel_material){
        try {
            let conn = await pool.getConnection();
            let sql = "SELECT * FROM Jewels WHERE Jewel_material = ?";
            const rows = await conn.query(sql, Jewel_material);
            conn.end();
            console.log("ROWS FETCHED: "+rows.length);
            return rows;
        }
        catch (err) {
            console.log(err);
            throw err; 
        }
    },


    async getOneCategory(Jewel_category){ 
        try {
            let conn = await pool.getConnection();
            let sql = "SELECT * FROM Jewels WHERE Jewel_category = ?";
            const rows = await conn.query(sql, Jewel_category);
            conn.end();
            console.log("ROWS FETCHED: "+rows.length);
            return rows;
        }
        catch (err) {
            console.log(err);
            throw err; 
        }
    },

    async getbyprice(Jewel_price){ 
        try {
            let conn = await pool.getConnection();
            let sql = "SELECT * FROM Jewels WHERE price = ?";
            const rows = await conn.query(sql, Jewel_price);
            conn.end();
            console.log("ROWS FETCHED: "+rows.length);
            return rows;
        }
        catch (err) {
            console.log(err);
            throw err; 
        }
    },

    async getOneJewel(Jewel_ID){ 
        try {
            let conn = await pool.getConnection();
            let sql = "SELECT * FROM Jewels WHERE Jewel_ID = ?";
            const rows = await conn.query(sql, Jewel_ID);
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

    async delOneJewel(Jewel_ID){ 
        try {
            let conn = await pool.getConnection();
            let sql = "DELETE FROM Jewels WHERE Jewel_ID = ?";
            const okPacket = await conn.query(sql,Jewel_ID); 
            conn.end();
            console.log(okPacket);
            return okPacket.affectedRows;
        }
        catch (err) {
            console.log(err);
            throw err; 
        }
    },

    async addOneJewel(Jewel_ID){ 
        try {
            let conn = await pool.getConnection();
            let sql = "INSERT INTO Jewels (Jewel_ID,Jewel_name) VALUES (NULL,?)";
            const okPacket = await conn.query(sql,Jewel_ID); 
            conn.end();
            console.log(okPacket);
            return okPacket.insertId;
        }
        catch (err) {
            console.log(err);
            throw err; 
        }
    },
    async editOneJewel(Jewel_ID, Jewel_material, size, price, Jewel_name, Stone, Jewel_category,Stock){ 
        try {
            let conn = await pool.getConnection();
            let sql = "UPDATE Jewels SET Jewel_material=?, size=?, price=?, Jewel_name=?, Stone=?, Jewel_category = ?, Stock = ? WHERE Jewel_ID=? ";
            const okPacket = await conn.query(sql,[Jewel_material, size, price, Jewel_name, Stone, Jewel_category,Stock,Jewel_ID]);
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