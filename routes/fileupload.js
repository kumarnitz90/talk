/**
 * Created by user on 9/17/2017.
 */
var express = require('express');
var router = express.Router();
var path = require('path');
var MongoClient = require('mongodb').MongoClient;
var url = "mongodb://127.0.0.1:27017/talk";
const fileUpload = require('express-fileupload');
var mv = require('mv');
/* GET home page. */
router.post('/', function(req, res, next) {
    if (!req.files)
        return res.status(400).send('No files were uploaded.');
    if (req.files){


        // The name of the input field (i.e. "sampleFile") is used to retrieve the uploaded file
        var sampleFile = req.files.sampleFile;

        //filename = sampleFile.name;
        console.log(sampleFile);
        // Use the mv() method to place the file somewhere on your server
        sampleFile.mv("D://samplenodejs//talk//upload//profile", function(err,res) {
            if (err){
                //res.status(500).send(err);
            }else{


                res.send('File uploaded!');
            }



        });
    }
});

module.exports = router;
