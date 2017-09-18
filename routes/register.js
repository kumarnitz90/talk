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
router.post('/', function(req, res, next) {
    var hashedPassword =  crypto.createHash('sha256').update(req.body.password).digest('base64');
    console.log(hashedPassword);
    var createdAt = Date.now();
    var role = "user";
    var userDetail = {
      userName : req.body.userName,
      password : hashedPassword,
      createdBy: createdAt,
      role : role
    };
    mongo.connect(url,function(err, db){
        assert.equal(null, err);
        db.collection('users').insertOne(userDetail, function(err, db){
            assert.equal(null, err);
            console.log('inserted');
            // db.close();
        });
        db.close();
    });
    res.send({"status":"success"});

});

module.exports = router;