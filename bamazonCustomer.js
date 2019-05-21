var mysql = require("mysql");

// create the connection information for the sql database
var connection = mysql.createConnection({
    host: "localhost",

    // Your port; if not 3306
    port: 3306,

    // Your username
    user: "root",

    // Your password
    password: "Password01",
    database: "bamazon_db"
});

connection.connect(function (err) {
    if (err) throw err;
    console.log("connected as id " + connection.threadId + "\n");
    readBamazon();
});

function readBamazon() {
    connection.query("SELECT * FROM products", function (err, res) {
        if (err) throw err;

        // Log all results of the SELECT statement

        console.log(res);
        // "Product: " +
        // res.product_name +
        // " || Department: " +
        // res.department_name +
        // " || Price: " +
        // res.price +
        // " || Stock Quantity: " +
        // res.stock_quantity);

        connection.end();
    });
}
