const path = require('path');
const {Person} = require("../models/schema");
const {Company} = require("../models/schema");

exports.sendLoginPage = (req , res , next) => {
    res.sendFile(path.join(__dirname , '../Views/login.html'));
}
exports.makeLogin = (req , res , next) => {
    if (req.body.username == "" || req.body.password == "" ||
    req.body.usertype == undefined) res.sendFile(path.join(__dirname , '../Views/login.html'));
    else{
        var loggedin = false;
        if (req.body.usertype == "person"){
            try{
                Person.find(function(err , data){
                    if (err) throw err;
                    for (var i = 0 ; i < data.length ; i++){
                        if (req.body.username == data[i].personEmail && req.body.password == data[i].personPassword){
                            console.log("login happens");
                            loggedin = true;
                            exports.USERTYPE = req.body.usertype;
                            exports.USERID = data[i].personID;
                            break;
                        }
                    }
                    if (loggedin) {
                        res.redirect("home");
                    }
                    else {
                        res.sendFile(path.join(__dirname , '../Views/login.html'));
                    }
                });
            }catch(err){
                console.error(err);
            }
        }else if (req.body.usertype == "company"){
            try{
                Company.find(function(err , data){
                    if (err) throw err;
                    for (var i = 0 ; i < data.length ; i++){
                        if (req.body.username == data[i].companyUserName && req.body.password == data[i].companyPassword){
                            console.log("company login happens");
                            loggedin = true;
                            exports.USERTYPE = req.body.usertype;
                            exports.USERID = data[i].companyID;
                            break;
                        }
                    }
                    if (loggedin) {
                        res.redirect("home");
                    }
                    else {
                        res.sendFile(path.join(__dirname , '../Views/login.html'));
                    }
                });
            }catch(err){
                console.error(err);
            }
        }
    }
}
