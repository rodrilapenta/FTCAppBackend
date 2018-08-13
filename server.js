var express = require('express');
var app = express();
var fs = require("fs");
//var bodyParser = require('body-parser');

app.use(express.json());

app.get('/cards', function (req, res) {
  fs.readFile( __dirname + "/" + "cards.json", 'utf8', function (err, data) {
      console.log(data);   
      res.setHeader('Content-Type', 'application/json');
      res.end(data);
  });
})

app.get('/listUsers', function (req, res) {
   fs.readFile( __dirname + "/" + "users.json", 'utf8', function (err, data) {
       console.log( data );
       res.end( data );
   });
})

app.get('/users', function (req, res) {
   // First read existing users.
   fs.readFile( __dirname + "/" + "users.json", 'utf8', function (err, data) {
      var users = JSON.parse( data );
      var user = users["user" + req.query.id] ;
      console.log( user );
      res.end( SON.stringify(user));
   });
})

app.get('/users/:id', function (req, res) {
   // First read existing users.
   fs.readFile( __dirname + "/" + "users.json", 'utf8', function (err, data) {
      var users = JSON.parse( data );
      var user = users["user" + req.params.id] 
      console.log( user );
      res.header('Content-Type', "application/json");
      res.end( JSON.stringify(user));
   });
})

app.get('/age/:age', function (req, res) {
   // First read existing users.
   fs.readFile( __dirname + "/" + "users.json", 'utf8', function (err, data) {
      var users = JSON.parse( data );

    users = users.filter(u => u.age == req.params.age).map(u => u.name).join(" ").re;

      res.end( JSON.stringify(users));
   });
})

app.post('/users', function (req, res) {

  var user = req.body;

  fs.readFile( __dirname + "/" + "users.json", 'utf8', function (err, data) {
   
    var users = JSON.parse( data );
    console.log(users);
    users.push(user);

    fs.writeFile( __dirname + "/" + "users.json", JSON.stringify(users), 'utf8', function (err, data) { 

      if(err !== null) console.err(err);
      else res.end(JSON.stringify(user));
    });

   //users = users.filter(u => u.age == req.params.age).map(u => u.name).join(" ").re;
  });
})


app.put('/age/:age', function (req, res) {
  // First read existing users.
 

    res.setHeader('Content-Type', 'application/json');
    res.send(JSON.stringify({ a: 1 }));

 /* fs.readFile( __dirname + "/" + "users.json", 'utf8', function (err, data) {
     var users = JSON.parse( data );

   users = users.filter(u => u.age == req.params.age).map(u => u.name).join(" ").re;
*/
     res.end( JSON.stringify(users));

})

const PORT = process.env.PORT || 3000;

var server = app.listen(PORT, function () {

  console.log("Servidor levantado en https://pruebabackend2018.herokuapp.com:%s", PORT)

})