// modules
let http = require('http');
let express = require('express');
let mongodb = require('mongodb');
let mongoose = require('mongoose');

// Database variables
let database;
let UserSchema;
let UserModel;


function connectDB(){
    // database info
    let databaseURL = 'mongodb://localhost:27017/local';

    // database connection
    mongoose.connect(databaseURL);
    database = mongoose.connection;

    database.on('error', console.error.bind(console, 'mongoose connection error'));
    database.on('open', function(){
        console.log('database connection succeed :: '+databaseURL);

        // define user schema
        // make a model instance
        createUserSchema();  

        // do Test
        doTest();
    });

    database.on('disconnect', connectDB);
}

// define user schema
// make a model instance
function createUserSchema(){

    // define schema
    // change "password" attribute into "hashed_password"
    // add all the 'default' attribute and "salt" attribute
    UserSchema = mongoose.Schema({
        id : {type : String, required : true, unique : true},
        name : {type : String, index : 'hashed', 'default' : ''},
        age : {type : Number, 'default' : -1},
        created_at : {type : Date, index : {unique : false}, 'default' : Date.now},
        updated_at : {type : Date, index : {unique : false}, 'default' : Date.now}
    });
    
    // define info with virtual method
    UserSchema
        .virtual('info')
        .set(function(info){
            let splitted = info.split(' ');
            this.id = splitted[0];
            this.name = splitted[1];
        })
        .get(function(){ return this.id + ' ' + this.name });
    
    // define 'UserModel'
    UserModel = mongoose.model("users4", UserSchema);

}

function doTest(){
    // make a UserModel instance
    // id, name 속성은 할당하지 않고 info 속성만 할당함
    let user = new UserModel({"info" : "test01 윤태훈"});

    // save()
    user.save(function(err){
        if(err) throw err;

        findAll();
    });

}

function findAll(){
    UserModel.find({}, function(err,results){
        if(err) throw err;

        if(results){
            console.log('조회된 user 문서 객체 #0 -> id : %s, name : %s',results[0]._doc.id, results[0]._doc.name);
        }
    });
}

connectDB();