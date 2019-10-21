var express = require("express");
var bodyParser = require("body-parser");
var oracledb = require('oracledb');
var config = require('./config.js');


var app = express()
var publicDir = require('path').join(__dirname, '/');
app.use(express.static(publicDir))
app.use(bodyParser.urlencoded({ extended: true }))
app.set("view engine", "ejs")

oracledb.autoCommit=true;

app.post('/signup', function (req, res) {
    var firstname = req.body.firstname;
    var shopname = req.body.shopname;
    var email = req.body.email;
    var pass = req.body.password;
    var phone = req.body.phone;
    var about = req.body.about;
    var country = req.body.country;
    var state = req.body.state;
    var city = req.body.city;
    var zip = req.body.zip;
    (async function(){
        try{
        connection = await oracledb.getConnection(config.database);
        console.log('Database Connected Successfully!');
    }catch(err){
        console.log(err);
    }finally{
        if(connection){
            try{
                await connection.execute(`insert into users values ('${firstname}','${shopname}','${email}','${pass}','${phone}','${about}','${country}','${state}','${city}','${zip}')`);
            }catch(err){
                console.log(err);
            }finally{
                if(connection){
                    try{
                    await connection.close();
                }catch(err){
                console.log('Unable to disconnect database');
            }
            }
        }
    }
}
})()
    res.render('home1.ejs');
})

app.post('/login', function (req, res) {
    var qemail = req.body.email;
    var qpass = req.body.password;
    var items = [];
    var x ={};
    (async function(){
        try{
        connection = await oracledb.getConnection(config.database);
        console.log('Database Connected Successfully!');
    }catch(err){
        console.log(err);
    }finally{
        if(connection){
            try{
                result = await connection.execute(`select * from users where email = '${qemail}' and pass = '${qpass}'`,);
                if(result.rows.length == 1){
                    x = JSON.stringify(result);
                    x = JSON.parse(x);
                    x = x.rows[0];
                }
            }catch(err){
                console.log(err);
            }finally{
                if(connection){
                    try{
                    await connection.close();
                    res.render('userpage.ejs', { 'username': x[0], 'firstname': x[0], 'shopname': x[1], 'email': x[2], 'phone': x[3], 'about': x[4], 'country': x[5], 'state': x[6], 'city': x[7], 'zip': x[8], 'items': [] });
                }catch(err){
                console.log('Unable to disconnect database');
            }
            }
        }
    }
}
})()
})

app.get('/login', function (req, res) {
    res.render('login.ejs');
})

app.get('/signup', function (req, res) {
    res.render('signup.ejs');
})

app.get('/home1', function (req, res) {
    res.render('home1.ejs')
})

app.get('/', function (req, res) {
    res.set({
        'Access-control-Allow-Origin': '*'
    });
    res.redirect('/home1')
}).listen(3000)


console.log("server listening at port 3000");