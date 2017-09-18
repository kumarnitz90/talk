/**
 * Created by user on 9/16/2017.
 */
/**
 * Created by user on 9/16/2017.
 */
var express = require('express');
var router = express.Router();
var mongo = require('mongodb');
var MongoClient = require('mongodb').MongoClient;
var assert = require('assert');
var url = "mongodb://localhost:27017/talk";
var bodyParser = require('body-parser');
var passwordHash = require('password-hash');
var crypto = require('crypto');
/* GET home page. */
var session = require('express-session');

var sess;
router.post('/', function(req, res, next) {
    //var hashedPassword = passwordHash.generate(req.body.password);
    var hashedPassword = crypto.createHash('sha256').update(req.body.password).digest('base64');
    console.log(hashedPassword);
    var userDetail = {
        userName : req.body.userName,
        password : hashedPassword
    };

    console.log(req.body.userName);
    MongoClient.connect(url, function(err, db) {
        if (err) throw err;
        db.collection("users").findOne({userName :req.body.userName,password : hashedPassword},function(err, result) {
            if (err) {
                console.log(result);
                res.send({"status":"unsuccess"});
            }else{

                if(result != null){
                    sess=req.session;
                    sess.userName = req.body.userName;
                    console.log(result);
                    res.send({"status":"success"});
                }else{
                    res.send({"status":"unsuccess"});
                }


            }
            db.close();
        });
    });


});

module.exports = router;