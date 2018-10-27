var mysql = require("mysql");
var inquirer = require("inquirer");

var connection = mysql.createConnection({
    host: "localhost",

    port: 3306,
    
    user: "root",

    password:"password",
    database:"bamazon_DB"
});

connection.query("SELECT * FROM products", function(err, res) {
    if (err) throw err;
    console.log("\n");
    for (var i = 0; i < res.length; i++){
        console.log(` ID #: ${res[i].item_id} || Product: ${res[i].product_name} || Price: ${res[i].price}`);
    }
    console.log("\n");
    inquirer
        .prompt([
            {
                type: "input",
                name: "productID",
                message: "Please enter product ID for purchest"
            },
            {
                type: "input",
                name: "productAmount",
                message: "Enter amount of product you would like to purchest"
            }
        ])
        .then(function (answer) {
            var id = answer.productID;
            var amount = answer.productAmount;

            if (isNaN(amount) || isNaN(id)) {
                console.log("Not enough item in inventory, please enter a lower amount")
            }
        })
});

