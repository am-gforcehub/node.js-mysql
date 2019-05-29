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
        console.log("===============================================================");

        console.log("Welcome to Bamazon! See the list of all products in stock here!");
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
                            console.log("Price: $" + res[i].price);
                            console.log("Quantity: " + userPurchase.Book_Amount);
                            console.log("----------------");
                            console.log("Total: $" + res[i].price * userPurchase.Book_Amount);
                            console.log("====================================");

                            var newStock = (res[i].stock_quantity - userPurchase.Book_Amount);
                            var purchaseId = (userPurchase.Books);
                            confirmPurchase(newStock, purchaseId);
                        }
                    }
                });
            });


    };
    function confirmPurchase(newStock, purchaseId) {
        inquirer
            .prompt([
                {
                    name: "Confirm_Purchase",
                    type: "confirm",
                    message: "Please confirm the listed item and quantity for your purchase?",
                    default: true

                }]).then(function (userConfirm) {
                    if (userConfirm.Confirm_Purchase === true) {

                        connection.query("UPDATE products SET ? WHERE ?", [{
                            stock_quantity: newStock
                        }, {
                            product_name: purchaseId
                        }], function (err, res) { });

                        console.log("==================================================");
                        console.log("Transaction complete. Thank you for your purchase!");
                        console.log("==================================================");
                        beginBamazon();
                    } else {
                        console.log("============================");
                        console.log("Okay fine, maybe next time!");
                        console.log("============================");
                        connection.end();
                    }
                });
    }
    function officeSearch() {
        inquirer
            .prompt([
                {
                    name: "Office_Supplies",
                    type: "list",
                    message: "Which item would you like to purchase?",
                    choices: ["Sharpie Permanent Marker", "Expo Dry Erase Marker", "Pilot G-2 07 Pen"]
                },
                {

                    name: "Office_Amount",
                    type: "input",
                    message: "How many items would you like to purchase?",
                    validate: function (value) {
                        if (isNaN(value) === false) {
                            return true;
                        }
                        return false;
                    }
                }

            ]).then(function (userPurchase) {

                //connect to database to find stock_quantity in database. If user quantity input is greater than stock, decline purchase.

                connection.query("SELECT * FROM products WHERE product_name=?", userPurchase.Office_Supplies, function (err, res) {
                    for (var i = 0; i < res.length; i++) {

                        if (userPurchase.Office_Amount > res[i].stock_quantity) {

                            console.log("=========================================================================");
                            console.log("Sorry are currently out of stock on this product. Please try again later.");
                            console.log("=========================================================================");

                            officeSearch();

                        } else {
                            //list item information for user for confirm prompt
                            console.log("=====================================");
                            console.log("Great News! We can fulfull your order!");
                            console.log("=====================================");
                            console.log("You've selected the following item:");
                            console.log("-----------------------------------");
                            console.log("Item: " + res[i].product_name);
                            console.log("Department: " + res[i].department_name);
                            console.log("Price: $" + res[i].price);
                            console.log("Quantity: " + userPurchase.Office_Amount);
                            console.log("----------------");
                            console.log("Total: $" + res[i].price * userPurchase.Office_Amount);
                            console.log("=================================++++++++++++++++++===");

                            var newStock = (res[i].stock_quantity - userPurchase.Office_Amount);
                            var purchaseId = (userPurchase.Office_Supplies);
                            confirmPurchase(newStock, purchaseId);
                        }
                    }
                });
            });


    };
    function confirmPurchase(newStock, purchaseId) {
        inquirer
            .prompt([
                {
                    name: "Confirm_Purchase",
                    type: "confirm",
                    message: "Please confirm the listed item and quantity for your purchase?",
                    default: true

                }]).then(function (userConfirm) {
                    if (userConfirm.Confirm_Purchase === true) {

                        connection.query("UPDATE products SET ? WHERE ?", [{
                            stock_quantity: newStock
                        }, {
                            product_name: purchaseId
                        }], function (err, res) { });

                        console.log("==================================================");
                        console.log("Transaction complete. Thank you for your purchase!");
                        console.log("==================================================");
                        beginBamazon();
                    } else {
                        console.log("============================");
                        console.log("Okay fine, maybe next time!");
                        console.log("============================");
                        connection.end();
                    }
                });
    }
    function dogFoodSearch() {
        inquirer
            .prompt([
                {
                    name: "Dog_Food",
                    type: "list",
                    message: "Which dog food would you like to purchase?",
                    choices: ["Alpo 8 ounce can", "Purina Pro Plan Dry Dog Food", "Pedigree Food for Dogs"]
                },
                {

                    name: "Dog_Food_Amount",
                    type: "input",
                    message: "How many items of dog food would you like to purchase?",
                    validate: function (value) {
                        if (isNaN(value) === false) {
                            return true;
                        }
                        return false;
                    }
                }

            ]).then(function (userPurchase) {

                //connect to database to find stock_quantity in database. If user quantity input is greater than stock, decline purchase.

                connection.query("SELECT * FROM products WHERE product_name=?", userPurchase.Dog_Food, function (err, res) {
                    for (var i = 0; i < res.length; i++) {

                        if (userPurchase.Dog_Food_Amount > res[i].stock_quantity) {

                            console.log("=========================================================================");
                            console.log("Sorry are currently out of stock on this product. Please try again later.");
                            console.log("=========================================================================");

                            dogFoodSearch();

                        } else {
                            //list item information for user for confirm prompt
                            console.log("=====================================");
                            console.log("Great News! We can fulfull your order!");
                            console.log("=====================================");
                            console.log("You've selected the following item:");
                            console.log("-----------------------------------");
                            console.log("Item: " + res[i].product_name);
                            console.log("Department: " + res[i].department_name);
                            console.log("Price: $" + res[i].price);
                            console.log("Quantity: " + userPurchase.Dog_Food_Amount);
                            console.log("----------------");
                            console.log("Total: $" + res[i].price * userPurchase.Dog_Food_Amount);
                            console.log("====================================");

                            var newStock = (res[i].stock_quantity - userPurchase.Dog_Food_Amount);
                            var purchaseId = (userPurchase.Dog_Food);
                            confirmPurchase(newStock, purchaseId);
                        }
                    }
                });
            });


    };
    function confirmPurchase(newStock, purchaseId) {
        inquirer
            .prompt([
                {
                    name: "Confirm_Purchase",
                    type: "confirm",
                    message: "Please confirm the listed item and quantity for your purchase?",
                    default: true

                }]).then(function (userConfirm) {
                    if (userConfirm.Confirm_Purchase === true) {

                        connection.query("UPDATE products SET ? WHERE ?", [{
                            stock_quantity: newStock
                        }, {
                            product_name: purchaseId
                        }], function (err, res) { });

                        console.log("==================================================");
                        console.log("Transaction complete. Thank you for your purchase!");
                        console.log("==================================================");
                        beginBamazon();
                    } else {
                        console.log("============================");
                        console.log("Okay fine, maybe next time!");
                        console.log("============================");
                        connection.end();
                    }
                });
    }
    function catFoodSearch() {
        inquirer
            .prompt([
                {
                    name: "Cat_Food",
                    type: "list",
                    message: "Which cat food item would you like to purchase?",
                    choices: ["Science Diet Indoor Cat Food", "Science Diet Indoor Cat Food"]
                },
                {

                    name: "Cat_Food_Amount",
                    type: "input",
                    message: "How many items would you like to purchase?",
                    validate: function (value) {
                        if (isNaN(value) === false) {
                            return true;
                        }
                        return false;
                    }
                }

            ]).then(function (userPurchase) {

                //connect to database to find stock_quantity in database. If user quantity input is greater than stock, decline purchase.

                connection.query("SELECT * FROM products WHERE product_name=?", userPurchase.Cat_Food, function (err, res) {
                    for (var i = 0; i < res.length; i++) {

                        if (userPurchase.Cat_Food_Amount > res[i].stock_quantity) {

                            console.log("=========================================================================");
                            console.log("Sorry are currently out of stock on this product. Please try again later.");
                            console.log("=========================================================================");

                            catFoodSearch();

                        } else {
                            //list item information for user for confirm prompt
                            console.log("=====================================");
                            console.log("Great News! We can fulfull your order!");
                            console.log("=====================================");
                            console.log("You've selected the following item:");
                            console.log("-----------------------------------");
                            console.log("Item: " + res[i].product_name);
                            console.log("Department: " + res[i].department_name);
                            console.log("Price: $" + res[i].price);
                            console.log("Quantity: " + userPurchase.Cat_Food_Amount);
                            console.log("----------------");
                            console.log("Total: $" + res[i].price * userPurchase.Cat_Food_Amount);
                            console.log("====================================");

                            var newStock = (res[i].stock_quantity - userPurchase.Cat_Food_Amount);
                            var purchaseId = (userPurchase.Cat_Food);
                            confirmPurchase(newStock, purchaseId);
                        }
                    }
                });
            });


    };
    function confirmPurchase(newStock, purchaseId) {
        inquirer
            .prompt([
                {
                    name: "Confirm_Purchase",
                    type: "confirm",
                    message: "Please confirm the listed item and quantity for your purchase?",
                    default: true

                }]).then(function (userConfirm) {
                    if (userConfirm.Confirm_Purchase === true) {

                        connection.query("UPDATE products SET ? WHERE ?", [{
                            stock_quantity: newStock
                        }, {
                            product_name: purchaseId
                        }], function (err, res) { });

                        console.log("==================================================");
                        console.log("Transaction complete. Thank you for your purchase!");
                        console.log("==================================================");
                        beginBamazon();
                    } else {
                        console.log("============================");
                        console.log("Okay fine, maybe next time!");
                        console.log("============================");

                    }
                });
    }

    beginBamazon();
});
