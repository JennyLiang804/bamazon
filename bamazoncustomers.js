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
    console.log("Start function initiated");

    connection.query("SELECT * FROM bamazon_db.products", function (err,results) {
        if (err) throw err;
        console.log("\n");
        inquirer
            .prompt([{ 
                name: "Choices",
                type: "rawlist",
                choices: function() {
                    var productNames = [];
                    for (var i = 0; i < results.length; i++) {
                        productNames.push(results[i].produce_name);
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
        .then(
            function (answer) {
                var chosenItem;
                for (var i = 0; i < results.length; i++){
                    if (results[i].produce_name === answer.choices){
                        chosenItem = results[i];
                    }
                }
                var itemID = chosenItem.item_id
                console.log(`${chosenItem.produce_name} quantity in stock
                ========================
                ${chosenItem.stock_quantity} at $${chosenItem.price} each 
                ========================
                You have selected to purchase ${answer.bit} ${answer.choice}`);

                var selectionAmount = answer.bid;
                var storeQuantity = chosenItem.stock_quantity
                if (selectionAmount > storeQuantity) {
                    console.log("Insufficient quantity!");
                    console.log(`${chosenItem.produce_name} quantity in stock
                    ===================
                    ${chosenItem.stock_quantity}
                    ====================
                    You have selected to purchase ${answer.bid} ${answer.choice}`);
                    start();
                } else if (selectionAmount <= storeQuantity) {
                    console.log("Order added!");

                    var newStoreQueryStr = 'UPDATE products SET stock_quantity = ' + newStoreQuantity + `Where item_id = ` + itemID;
                    connection.query(updaQueryStr, function(err, data) {
                        if (err) throw(err);
                        console.log(`Your order has been succefully placed! Your total is $` + chosenItem.price * answer.bid)
                    })
                    inquirer.prompt([{
                        name:"choice",
                        type: " rawlist",
                        message: "Would you like to buy anything else?",
                        choices: ["YES", "NO"]
                    }
                ]).then(function(answer){
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