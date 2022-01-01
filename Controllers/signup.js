const path = require('path');
const {Person} = require("../models/schema");
const {Company} = require("../models/schema");
exports.UserID = -1;

exports.SendCompanySignupPage = (req , res , next) => {
    res.sendFile(path.join(__dirname , '../Views/signupcomp.html'));
}
exports.ConfirmCompanySignUp = (req , res , next) => {
    console.log("recived company sign up data");
    var exist = false;
    try{
        Company.find(function(err , data){
            if(err) throw err;
            for (var i = 0 ; i < data.length ; i++){
                if (data[i].companyUserName == req.body.Username){
                    res.writeHead(200 ,{ "Content-Type" : "text/plain" });
                    res.end("EXIST");
                    exist = true;
                    break;
                }
            }
            if(!exist){
                res.writeHead(200 ,{ "Content-Type" : "text/plain" });
                res.end("NOTEXIST");
                const Insertdata = {
                    companyID : Number(data.length + 1) , 
                    companyName : req.body.Companyname , 
                    companyDescription : req.body.Companydescription , 
                    companyUserName : req.body.Username , 
                    companyPassword : req.body.Password , 
                };
                new Company(Insertdata).save().then(function (){
                    console.log("company added succefully");
                });
            }
        });
    }catch(err){
        console.error(err);
    }
}
exports.SendSignupPage = (req , res , next) => {
    res.sendFile(path.join(__dirname , '../Views/signup.html'));
}
exports.ConfirmSignUp =  (req , res , next) => {
    console.log("recived sign up data");
    var exist = false;
        try{
            Person.find(function(err , data){
                if (err) throw err;
                for (var i = 0 ; i < data.length ; i++){
                    if (data[i].personEmail == req.body.Email){
                        res.writeHead(200 ,{ "Content-Type" : "text/plain" });
                        res.end("EXIST");
                        exist = true;
                        break;
                    }
                }
                if(!exist){
                    res.writeHead(200 ,{ "Content-Type" : "text/plain" });
                    res.end("NOTEXIST");
                    exports.UserID = Number(data.length + 1);
                    const Insertdata = {
                        personID : Number(data.length + 1) , 
                        personFullName : req.body.Fullname , 
                        personAge : Number(req.body.Age) , 
                        personCountry : Number(req.body.Country) , 
                        personCity : Number(req.body.City) , 
                        personMainMajor : Number(req.body.Major) , 
                        personGeneralSkill1 : Number(req.body.Skill1) , 
                        personGeneralSkill2 : Number(req.body.Skill2) , 
                        personCVfileName : "" , 
                        personEmail : req.body.Email , 
                        personPassword : req.body.Password
                    };
                    new Person(Insertdata).save().then(function (){
                        console.log("added succefully");
                    });
                }
            });
            console.log("res sent");
        }catch(err){
            console.error(err);
        }
}