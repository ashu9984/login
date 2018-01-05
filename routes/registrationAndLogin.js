var express = require('express')

var registrationLogin = express.Router()

var mongoose = require('mongoose')

var user = require('../models/registration')
var mailer = require('node-mailer');
var nodemailer = require('nodemailer');
var otp= Math.floor(Math.random() *1000000).toString()

registrationLogin.post('/registration', function (req, res) {

    if (req.body.email && req.body.password) {
        var userSave = new user({
           
            email: req.body.email,
            password: req.body.password ,
            otp:otp
        })

        userSave.save(function (err, data) {
            if (err) {
                res.json({
                    success: false
                })
            }

var transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
      user : "ashuch9984@gmail.com",
      pass :"ashu@@9984"
    }
  });
  
  var mailOptions = {
    from: 'ashuch9984@gmail.com',
    to: req.body.email,
    subject: 'Send Email using Node.js',
    text: "your Otp is  "+ otp
  };
  
  transporter.sendMail(mailOptions, function(error, info){
    if (error) {
      console.log(error);
    } else {
      console.log('Email sent: ' + info.response);
    }
  });

            res.json({
                success: true,
                msg: 'RESGISTRATION DONE  &   PLEASEl ENTER OTP'
            })
        })
    } else {
        res.json({
            sucess: false,
            msg: 'NO DATA/WORNG DATA SENT'
        })
    }

})

registrationLogin.post('/login', function (req, res) {
    user.findOne({ email: req.body.email, }, function (err, data) {
        if (err) {
            res.json({
                status: false,
                msg: 'data not found'
            })
        }
        else {
            if (data === null || data.length == 0) {
                res.json({
                    status: false,
                    msg: "user not found"
                })
            }
           
            else if (data.password == req.body.password  ) {
                
                res.json({
                    status:true,
                    msg: 'find  token   & you are login',
                    
                    token: "abc"

                })
            }
            else {
                console.log(data);
                console.log(req.body)
                res.json({
                    status: false,
                    msg: 'wrong username & password & opt'
                })
            }
        }






    })

})


registrationLogin.post('/otp', function (req, res) {
    user.findOne({ email: req.body.email, }, function (err, data) {
        if (err) {
            res.json({
                status: false,
                msg: 'data not found'
            })
        }
        else {
            if (data === null || data.length == 0) {
                res.json({
                    status: false,
                    msg: "user not found"
                })
            }
           
            else if (data.otp == req.body.otp  ) {
                
                res.json({
                    status:true,
                    msg: 'valid otp',
                    
                    

                })
            }
            else {
                console.log(data);
                console.log(req.body)
                res.json({
                    status: false,
                    msg: 'invalid otp'
                })
            }
        }






    })

})



module.exports = registrationLogin


