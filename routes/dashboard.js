/**
 * Created by user on 9/16/2017.
 */
var express = require('express');
var router = express.Router();
var mongo = require('mongodb');
var MongoClient = require('mongodb').MongoClient;
var assert = require('assert');
var url = "mongodb://localhost:27017/talk";
/* GET home page. */
router.get('/', function(req, res, next) {


    sess = req.session;
   // console.log(sess);
    if(sess.userName) {
        var user = sess.userName;
        console.log(user);
        MongoClient.connect(url, function(err, db) {
            if (err) throw err;
            db.collection("users").findOne({userName :user},function(err, result) {
                if (err) {
                    //console.log(result);
                    res.send({"status":"unsuccess"});
                }else{
                    console.log("new "+result);
                    if(result != null){
                        console.log(result);
                        res.render('dashboard',{ result : result });
                    }else{
                        //res.send({"status":"unsuccess"});
                    }


                }
                db.close();
            });
        });


    }
    else {
        res.redirect('/');
    }

    //res.render('index', { title: 'Express' });
});

module.exports = router;
