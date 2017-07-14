let http = require('http');
let express = require('express');
let app = express();
let bodyParser = require('body-parser');
let mongoose = require('mongoose');

let database;

app.set('port', 8080);

app.use(bodyParser.urlencoded({
    extended: false
}));
app.use(bodyParser.json());


function connect() {
    let dbURL = 'mongodb://localhost:27017/local';

    mongoose.Promise = global.Promise;
    mongoose.connect(dbURL);

}

let postModel = require('./PostModel');
let userModel = require('./UserModel');

let userCount = 0;
let postCount = 0;
app.post('/user', function (req, res) {
    let user = new userModel({
        _id: userCount++
    });

    user.save();

    res.end();
});

app.post('/post', function (req, res) {
    console.log(userCount);
    let user = new userModel({
        _id: userCount++
    });
    user.save(function (err) {
        let post = new postModel({
            _publisher: user._id,
            title: req.body.title,
            content: req.body.content
        });

        post.save(function (err) {
            console.log(postCount);
            postModel.findOne({
                _id: postCount
            }).populate('_publisher').exec(function (err, post) {
                if (err) console.log(err.stack);
                console.log("publisher's _id is %s", post._publisher._id);
                res.end();
            });
        });

    });

});


app.get('/user', function (req, res) {
    userModel.findOne({}).populate('posts').exec();
    userModel.find({}, function (err, results) {
        let result = {
            info: []
        }

        for (var i = 0; i < results.length; i++) {
            result.info.push(results[i]);
        }

        res.end(JSON.stringify(result));
    });
});
http.createServer(app).listen(app.get('port'), function () {
    console.log('server started on ' + app.get('port') + 'port');

    connect();
});