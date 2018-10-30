var mysql = require("mysql");
var inquirer = require("inquirer");

var connection = mysql.createConnection({
    host: "localhost",

    port: 3306,
    
    user: "root",

    password:"password",
    database:"bamazon_DB"
});

connection.connect(function (err) {
    if (err) throw err;
    console.log("connected as id " + connection.threadId);
    console.log("Welcome to Bamazon!");
    start();
});

function start() {

    connection.query("SELECT * FROM bamazon_db.products", function (err,results) {
        if (err) throw err;
        console.log("\n");
        inquirer
            .prompt([{ 
                name: "choice",
                type: "list",
                choices: function() {
                    var productNames = [];
                    for (var i = 0; i < results.length; i++) {
                        productNames.push(results[i].product_name);
                    }
                    return productNames;
                },
                message: "Enter item ID for purchest"
            },
            {
                name: "bid",
                type: "input",
                message: "Enter amount"
            }
        ])
        .then(function (answer) {
                var chosenItem;
                for (var i = 0; i < results.length; i++){
                    if (results[i].product_name === answer.choice){
                        chosenItem = results[i];
                    }
                }
                var itemID = chosenItem.item_id
                console.log("item id: " + itemID);
                console.log(`${chosenItem.product_name} quantity in stock!
                ========================
                at $${chosenItem.price} each 
                ========================
                You have selected to purchase ${answer.bid} ${answer.choice}`);

                var selectionAmount = answer.bid;
                var storeQuantity = chosenItem.stock_quantity
                if (selectionAmount > storeQuantity) {
                    console.log("Insufficient quantity!");
                    console.log(`${chosenItem.product_name} quantity in stock
                    ===================
                    ${chosenItem.stock_quantity}
                    ====================
                    You have selected to purchase ${answer.bid} ${answer.choice}`);
                    start();
                } else if (selectionAmount <= storeQuantity) {
                    console.log(`
                =========================
                    Order added!`);

                    var newStoreQuantity = storeQuantity - selectionAmount;

                    var updateQueryStr = 'UPDATE products SET stock_quantity = ' + newStoreQuantity + ` WHERE item_id = ` + itemID;
                    // console.log('UpdateQueryStr = ' + updateQueryStr);
                    connection.query(updateQueryStr, function(err, data) {
                    if (err) throw(err);
                    console.log(`Your order has been succefully placed! Your total is $` + chosenItem.price * answer.bid);
                })
                inquirer
                    .prompt([{
                    name:"choice",
                    type: "rawlist",
                    message: "Would you like to buy anything else?",
                    choices: ["YES", "NO"]
                    }
                ])
                .then(function (answer) {
                    console.log("answer: " + answer.choice);
                    if (answer.choice === "YES") {
                        start()
                    }
                    else {
                        console.log("Thank you for shopping with us!");
                        connection.end()
                    }
                })
                }
            }
        )
    });
    
}