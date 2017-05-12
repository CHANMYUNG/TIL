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

// Use mongoose module 
var mongoose = require('mongoose');

// Database instance variable
var database;

// Database Schema instance variable
var UserSchema;

// Database model instance variable
var UserModel;

// Connect to database
function connectDB(){
    // Database connection info
    var databaseUrl = 'mongodb://localhost:27017/local';

    // Connection
    console.log('trying to connect DB...');
    mongoose.Promise = global.Promise;
    mongoose.connect(databaseUrl);
    database = mongoose.connection;

    database.on('error', console.error.bind(console, 'mongoose connection error.'));
    
    database.on('open',function(){
        console.log('Connection Succeed. : '+databaseUrl);
        
    // Schema defination
    UserSchema = mongoose.Schema({
        id : {type : String, require:true,unique:true},
        password : {type:String, require:true},
        name : {type : String, index : 'hashed'},
        age : {type : Number, 'default' : -1},
        created_at : {type : Date, index : {unique : false}, 'default' : Date.now},
        updated_at : {type : Date, index : {unique : false}, 'default' : Date.now}
    });

    UserSchema.static('findById', function(id, callback){
        return this.find({id : id}, callback);
    });
     
    UserSchema.static('findAll', function(callback){
        return this.find({}, callback);
    });
    console.log('UserSchema defination succeed');

    // UserModel model defination
    UserModel = mongoose.model("users2",UserSchema);
    console.log('UserModel defination succeed');
    
    });

    // Attempts to connect after 5 seconds if disconnected
    database.on('disconnect', function(){
        console.log("Connection lost. I will retry in 5 seconds.");
        setInterval(connectDB, 5000);
    })
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

// User Confirm Function
var authUser = function(database, id, password, callback){
    console.log("Function called 'authUser',"+id+","+password);

    UserModel.findById(id, function(err, results){
        if(err){
            // Error occured
            callback(err,null);
            return;
        }

        if(results.length > 0){
            // Confirm succeed
            if(results[0]._doc.password == password){
                callback(null,results);
            }
            // Could not confirm :: password
            else{
                callback(null,null);
            }
        }
        // Could not search user :: id
        else{
            callback(null,null);
        }
    });
};

// User Adding
var addUser = function(database, id, password, name, callback){
    console.log("Function called 'addUser'");

    // UserModel instance 
    var user = new UserModel({"id":id,"password":password,"name":name});

    // save() to save 
    user.save(function(err){
        if(err){
            callback(err,null);
            return;
        }
        console.log("Adding Succeed");
        callback(null,user);
    });
};

var router = express.Router();

// Route '/process/adduser' :: Add a new user
router.route('/process/adduser').post(function(req, res){
    console.log("Called '/process/adduser'");

    var paramId = req.body.id || req.query.id;
    var paramPassword = req.body.password || req.query.password;
    var paramName = req.body.name || req.query.name;

    // if database exists, call 'addUser' function
    if(database){
        addUser(database, paramId, paramPassword, paramName, function(err, result){
            if(err) throw err;
            console.dir(result);
            console.log(result.insertedCount);    
            // if something inserted
            if(result){
                
                res.writeHead('200',{"Content-Type" : "text/html;charset=utf8"});
                res.write("<h2>User Adding Succeed</h2>");
                res.write("<br><br><a href='/public/login.html'>Go login</a>");
                res.end();
            }
            else{
                res.writeHead('200',{"Content-Type" : "text/html;charset=utf8"});
                res.write("<h2>User Adding Failed</h2>");
                res.write("<br><br><a href='/public/login.html'>Go login</a>");
                res.end();
            }
        });
    }
    else{
        res.writeHead('200',{"Content-Type" : "text/html;charset=utf8"});
        res.write("<h2>Database Connecting Failed</h2>");
        res.write("<br><br><a href='/public/login.html'>Go login</a>");
        res.end();
    }
});

// Route '/process/listuser' :: User List
router.route('/process/listuser').post(function(req,res){
    console.log("Called '/process/listuser'");

    if(database){
        // Find all users
        UserModel.findAll(function(err, results){
            // If error occured
            if(err){
                res.writeHead('200',{'Content-Type' : 'text/html;charset=utf8'});
                res.write("<h2>ㅅ사용자 리스트 조회 중 오류 발생</h2>");
                res.write("<p>"+err.stack + "</p>");
                res.end();
                
                return;
            }

            if(results){
                res.writeHead('200',{'Content-Type' : 'text/html;charset=utf8'});
                res.write("<h2>사용자 리스트</h2>");
                res.write('<div><ul>');

                for(var i=0;i<results.length;i++){
                    res.write('     <li>#'+i+' : '+results[i].id +', '+results[i].name+'</li>');
                }

                res.write('</ul></div>');
                res.end();
            }
        });
    }
    // database == null
    else{
        res.writeHead('200',{'Content-Type' : 'text/html;charset=utf8'});
        res.write("<h2>ㅅ사용자 리스트 조회 중 오류 발생</h2>");
        res.end();
    }
});
app.use('/',router);

// Server RUN :: 
http.createServer(app).listen(app.get('port'), function(){
    console.log('server opened on '+app.get('port')+' port');
    
    // Database Connection
    connectDB();
});