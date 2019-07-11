//jshint esversion:6


const express = require("express");
//body parser is literally telling stuff coming into the express server to display on the body of the app
const bodyParser = require("body-parser");

const app = express();

let items = ["buy food", "Cook Food"];
let workItems = [];
app.set('view engine' , "ejs");

app.use(bodyParser.urlencoded({extended: true}));
app.use(express.static("public"));
app.get("/", function(req, res){
let today = new Date();

let options = {
  weekday: "long",
  day: "numeric",
  month: "long"
};

let day = today.toLocaleDateString("en-us", options);



    res.render("list", {listTitle: day, newListItems: items});

});

app.post("/", function (req, res){
 let item = req.body.newItem;
if(req.body.list === "Work"){
  workItems.push(item);
  res.redirect("/work");
}else{
  items.push(item);
  res.redirect("/");
}

 items.push(item);
res.redirect("/");
});
//creating the work page and tell it to display the work list and calling the array as well
app.get("/work", function(req,res){
  res.render("list", {listTitle:"Work List", newListItems: workItems});
});

app.post("/work", function (req, res){
 let item = req.body.newItem;
 workItems.push(item);
res.redirect("/work");
});
//creating a regular page with no computing
app.get("/about", function(req, res){
  res.render("about");
});

//console log for telling where the port is
app.listen(3000, function(){
  console.log("server started on port 3000");
});
