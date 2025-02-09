const express = require("express");
const mysql = require("mysql2");

const app = express();
app.use(express.json()); // Fix JSON middleware

// Configure MySQL connection
const connection = mysql.createConnection({
    host: "localhost",
    user: "root",
    password: "Panzer123qwe",
    database: "shop"
});

// Connect to MySQL
connection.connect((err) => {
    if (err) {
        console.log("Error connecting to MySQL:", err);
    }
});

//add bookshop
app.post("/bookshop", (req, res) => {
    const { shop_id, city , name ,contactNumber , email , Address } = req.body;
    const query = "INSERT INTO bookshop (shop_id, city, name, contactNumber , email , Address) VALUES (?, ?, ?, ?, ?, ?)";
    
    connection.query(query, [shop_id, city, name, contactNumber , email , Address], (err) => {
        if (err) {
            return res.status(500).json({ error: "Error adding new book", details: err.message });
        }
        res.status(201).json({ message: "Book has been added" });
    });
});

// get all bookshop
app.get("/bookshop", (req, res) => {
    const query = "SELECT * FROM bookshop";
    
    connection.query(query, (err, results) => {
        if (err) {
            return res.status(500).json({ error: "Error retrieving the books", details: err.message });
        }
        res.json(results);
    });
});

//get book shop by id
app.get("/bookshop/:shop_id", (req, res) => {
    const query = "SELECT * FROM bookshop WHERE shop_id = ?";
    
    connection.query(query, [req.params.shop_id], (err, results) => {
        if (err) {
            return res.status(500).json({ error: "Error retrieving the bookShop", details: err.message });
        }
        if (results.length === 0) {
            return res.status(404).json({ message: "BookShop not found" });
        }
        res.json(results[0]);
    });
});

//get cities
app.get("/bookshop/:shop_id/cities", (req, res) => {
    const query = "SELECT city FROM bookshop";  // نختار المدن فقط (قيمة مميزة)
    console.log("Querying for cities...")
    
    connection.query(query, (err, results) => {
        if (err) {
            return res.status(500).json({ error: "Error retrieving cities", details: err.message });
        }
        if (results.length === 0) {
            return res.status(404).json({ message: "No cities found" });
        }
        res.json(results);  // إرجاع قائمة المدن فقط
    });
});


//get name
app.get("/bookshop/:shop_id/name", (req, res) => {
    const query = "SELECT name FROM bookshop";  // نختار المدن فقط (قيمة مميزة)
    
    connection.query(query, (err, results) => {
        if (err) {
            return res.status(500).json({ error: "Error retrieving cities", details: err.message });
        }
        if (results.length === 0) {
            return res.status(404).json({ message: "No cities found" });
        }
        res.json(results);  // إرجاع قائمة المدن فقط
    });
});


//get by email id
app.get("/bookshop/:email", (req, res) => {
    const email = req.params.email;
    const query = "SELECT * FROM bookshop WHERE email = ?";
    
    connection.query(query, [ email], (err, results) => {
        if (err) {
            return res.status(500).json({ error: "Error retrieving the email", details: err.message });
        }
        if (results.length === 0) {
            return res.status(404).json({ message: "Email not found" });
        }
        res.json(results[0]);
    });
});

//Update Name 
app.put("/bookshop/:shop_id", (req, res) => {
    const { name } = req.body;
    const query = "UPDATE bookshop SET name = ? WHERE shop_id = ?";
    
    connection.query(query, [name,req.params.shop_id], (err, results) => {
        if (err) {
            return res.status(500).json({ error: "Error updating the bookshop", details: err.message });
        }
        if (results.affectedRows === 0) {
            return res.status(404).json({ message: "BookShop not found" });
        }
        res.status(200).json({ message: "BookShop has been updated" });
    });
});

//Update Email
app.put("/bookshop/:shop_id/:email", (req, res) => {
    const { email } = req.body;
    const query = "UPDATE bookshop SET email = ? WHERE shop_id = ?";
    
    connection.query(query, [email,req.params.shop_id], (err, results) => {
        if (err) {
            return res.status(500).json({ error: "Error updating the bookshop", details: err.message });
        }
        if (results.affectedRows === 0) {
            return res.status(404).json({ message: "BookShop not found" });
        }
        res.status(200).json({ message: "BookShop has been updated" });
    });
});

//Delete BookShop by ID
app.delete("/bookShop/:shop_id", (req, res) => {
    const query = "DELETE FROM bookShop WHERE shop_id = ?";
    
    connection.query(query, [req.params.shop_id], (err, results) => {
        if (err) {
            return res.status(500).json({ error: "Error deleting the bookShop", details: err.message });
        }
        if (results.affectedRows === 0) {
            return res.status(404).json({ message: "BookShop not found" });
        }
        res.status(200).json({ message: "BookShop has been deleted" });
    });
});


// Start the server
const port = 3001;
app.listen(port, () => {
    console.log(`Server has been started on http://localhost:${port}`);
});