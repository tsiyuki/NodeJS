var mysql = require('mysql');
var express = require("express")
var app = express()
var bodyParser = require('body-parser')

app.set("view engine", "ejs");
app.use(bodyParser.urlencoded({extended:true}));
app.use(express.static(__dirname + "/public"));

var connection = mysql.createConnection({
  host     : 'localhost',
  user     : 'tsiyuki',  //your username
  database : 'join_us'         //the name of your db
});

app.get("/", function(req,res){
    var q = "SELECT COUNT(*) AS count FROM users";
    connection.query(q, function(error, results){
        if (error) throw error;
        var count = results[0].count;
        res.render("home",{count:count});
    });
});

app.post("/register", function(req, res){
    var q = "INSERT INTO users SET ?";
    var people = {
        email: req.body.email
    };
    connection.query(q, people, function(error, results){
        if (error) throw error;
        res.redirect("/");
    });
});

app.get("/random_num", function(req,res){
    var num = Math.floor((Math.random() * 10 ) + 1);
    res.send("Your lucky number is " + num);
});

app.listen(8080, function(){
    console.log("App listening from port 8080!");
});