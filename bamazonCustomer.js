var mysql = require("mysql");
var inquirer = require("inquirer");

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
    if (err) {
        console.log("connected as id " + connection.threadId + "\n");
        return;
    };
    console.log("Connection Established");

    function beginBamazon() {
        connection.query("SELECT * FROM products", function (err, res) {
            if (err) throw err;

            // Log all results of the SELECT statement

            return (bamazonProducts(res));

        });
    }

    function bamazonProducts(products) {
        console.log("Welcome to Bamazon! Here are all of the products, costs, and amount in stock.");
        for (var i = 0; i < products.length; i++) {
            var productsResults = "\r\n" +
                "Item: " + products[i].id_item + "\r\n" +
                "Product Description: " + products[i].product_name + "\r\n" +
                "Department: " + products[i].department_name + "\r\n" +
                "Price: $ " + products[i].price + "\r\n" +
                "Amount in Stock: " + products[i].stock_quantity;
            console.log(productsResults);
        }
        readBamazon();
    };

    function readBamazon() {

        inquirer
            .prompt({
                name: "department",
                type: "list",
                message: "What would you like to buy today?",
                choices: [
                    "Books",
                    "Office Supplies",
                    "Dog Food",
                    "Cat Food",
                    "exit"
                ]
            })
            .then(function (answer) {
                switch (answer.department) {
                    case "Books":
                        bookSearch();
                        break;
                    case "Office Supplies":
                        officeSearch();
                        break;

                    case "Dog Food":
                        dogFoodSearch();
                        break;

                    case "Cat Food":
                        catFoodSearch();
                        break;

                    case "exit":
                        connection.end();
                        break;
                }
            });
    }

    function bookSearch() {
        inquirer
            .prompt([
                {
                    name: "Books",
                    type: "list",
                    message: "Which book would you like to purchase?",
                    choices: ["Get Programming", "Javascript&Jquery", "Eloquent Javascript"]
                },
                {

                    name: "Book_Amount",
                    type: "input",
                    message: "How many books would you like to purchase?",
                    validate: function (value) {
                        if (isNaN(value) === false) {
                            return true;
                        }
                        return false;
                    }
                }

            ]).then(function (userPurchase) {

                //connect to database to find stock_quantity in database. If user quantity input is greater than stock, decline purchase.

                connection.query("SELECT * FROM products WHERE product_name=?", userPurchase.Books, function (err, res) {
                    for (var i = 0; i < res.length; i++) {

                        if (userPurchase.Book_Amount > res[i].stock_quantity) {

                            console.log("=========================================================================");
                            console.log("Sorry are currently out of stock on this product. Please try again later.");
                            console.log("=========================================================================");

                            bookSearch();

                        } else {
                            //list item information for user for confirm prompt
                            console.log("=====================================");
                            console.log("Great News! We can fulfull your order!");
                            console.log("=====================================");
                            console.log("You've selected the following item:");
                            console.log("-----------------------------------");
                            console.log("Item: " + res[i].product_name);
                            console.log("Department: " + res[i].department_name);
                            console.log("Price: $ " + res[i].price);
                            console.log("Quantity: " + userPurchase.Book_Amount);
                            console.log("----------------");
                            console.log("Total: $" + res[i].price * userPurchase.Book_Amount);
                            console.log("====================================");

                        }
                    }
                });
            });


    };

    beginBamazon();
});
