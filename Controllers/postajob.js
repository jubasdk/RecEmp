const path = require('path');
const {Job} = require("../models/schema");
exports.SendPostAJob = (req , res , next) => {
    res.sendFile(path.join(__dirname , '../Views/postajob.html'));
}
exports.PostAJob = (req , res , next) => {
    try{
        Job.find(function(err , data){
            if (err) throw err;
            var maxID = 0;
            for (var i = 0 ; i < data.length ; i++){
                if (data[i].jobID > maxID) maxID = data[i].jobID;
            }
            maxID++;
            var major;
            if (req.body.majores == "CS") major = 1;
            else if (req.body.majores == "EE") major = 2;
            else if (req.body.majores == "M") major = 3;
            else if (req.body.majores == "other") major = 4;
            var skill1;
            if (req.body.skills == "skill1") skill1 = 1;
            else if (req.body.skills == "skill2") skill1 = 2;
            else if (req.body.skills == "skill3") skill1 = 3;
            else if (req.body.skills == "skill4") skill1 = 4;
            var skill2;
            if (req.body.skills2 == "skill5") skill2 = 5;
            else if (req.body.skills2 == "skill6") skill2 = 6;
            else if (req.body.skills2 == "skill7") skill2 = 7;
            else if (req.body.skills2 == "skill8") skill2 = 8;
            const addData = {
                jobID : maxID , 
                jobMajor : major , 
                jobGeneralSkill1 : skill1 , 
                jobGeneralSkill2 : skill2 , 
                jobDescription : req.body.description , 
                jobCompanyID : require("../Controllers/login").USERID
            };
            new Job(addData).save().then(function(){
                console.log("Job added succefully");
                res.redirect("home");
            });
        });
    }catch(err){
        console.log(err);
    }
}