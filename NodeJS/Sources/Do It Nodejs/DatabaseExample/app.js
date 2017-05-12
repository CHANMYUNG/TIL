// Express Basic modules
var http= require('http');
var express = require('express');
var path = require('path');

// Express Middlewares
var bodyParser = require('body-parser');
var cookieParser = require('cookie-parser');
var static = require('serve-static');
var errorHandler = require('errorhandler');

// Error Handler Moudle
var expressErrorHandler = require('express-error-handler');


// Session Middleware
var expressSession = require('express-session');


// Express Instance
var app = express();
app.set('port',process.env.PORT || 8080);

app.use(bodyParser.urlencoded({extended:false}));
app.use(bodyParser.json());

app.use('/public',static(path.join(__dirname, 'public')));

app.use(cookieParser());

app.use(expressSession({
    secret : 'my key',
    resave : true,
    saveUninitialized: true
}));

// Use MongoDB Module
var MongoClient = require('mongodb').MongoClient;

// Database instance variable
var database;

// Connect to database
function connectDB(){
    // Database connection info
    var databaseUrl = 'mongodb://localhost:27017/local';

    // Connection
    MongoClient.connect(databaseUrl, function(err, db){
        if(err){
            console.log(err);
            throw err;
        } 

        console.log('Database Connection Succeed, '+databaseUrl);

        // Variable assignment
        database = db;
    });
}

app.post('/process/login', function(req,res){
    var paramId = req.param('id');
    var paramPassword = req.param('password');
    
    if(database){
        authUser(database, paramId, paramPassword, function(err, docs){
            
            // error : database connecting fail
            if(err) throw err;

            
            // No error, user exist::
            if(docs){
                console.log('Seached :: \n');
                console.dir(docs);
                res.writeHead('200',{'Content-Type' : 'text/html;charset=utf8'});
                res.write("<h1>Login succeed</h1>");
                res.write("<div><p>User Id : "+paramId+"</p></div>");
                res.write("<div><p>User Name : "+docs[0].name+"</p></div>");
                res.write("<br><br><a href='/public/login.html'>Go login</a>");
                res.end();
            }

            // No error, user doesn't exist::
            else{
                res.writeHead('200',{'Content-Type' : 'text/html;charset=utf8'});
                res.write('<h1>Login failed</h1>');
                res.write('<div><p>Please check your id, password</p></div>');
                res.write("<br><br><a href='/public/login.html'>Go login</a>");
                res.end();
            }
        });
    }
});

// User Searching
var authUser = function(database, id, password, callback){
    console.log("Function called 'authUser'");

    // Refer to users collection
    var users = database.collection('users');
    
    // Search with id, password
    users.find({"id":id, "password":password}).toArray(function(err, docs){
        // If error occured => Call function 'callback'
        if(err){
            
            // Error
            callback(err, null);
            return;
        }
        console.log("row : "+docs.length);
        // Error didn't occur, and searching succeed
        if(docs.length > 0){
            console.log("아이디 [%s], 비밀번호 [%s]가 일치하는 사용자 찾음",id, password);
            
            // No error, user exist
            callback(null, docs);
        }
        else{
            console.log('User searching failed');

            // No error, user doesn't exist
            callback(null, null);
        }
    });
}

// Server RUN :: 
http.createServer(app).listen(app.get('port'), function(){
    console.log('server opened on '+app.get('port')+' port');
    
    // Database Connection
    connectDB();
});