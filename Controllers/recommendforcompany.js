const path = require('path');
const cheerio = require('cheerio');
const fs = require('fs'); 
const {Person} = require("../models/schema");
const {Job} = require("../models/schema");

exports.RecommendForCompany = (req , res , next) => {
    try{
        fs.readFile(path.join(__dirname , '../Views/home.html') , function(err , data){
            if (err) throw err;
            let $ = cheerio.load(data);
            $("body").append("<a href='http://localhost:5000/home'>Return to home</a><br>");
            Person.find(function(err , persons){
                if (err) throw err;
                Job.find(function(err , jobs){
                    var font = "";
                    for (var i = 0 ; i < jobs.length ; i++){
                        if (jobs[i].jobID == Number(req.body.JobID)){
                            for (var j = 0 ; j < persons.length ; j++){
                                if (persons[j].personMainMajor == jobs[i].jobMajor){
                                    font = "<h2>Name: " + persons[j].personFullName + "</h2>";
                                    font += "<h2>Age: " + persons[j].personAge + "</h2>";
                                    font += "<h2>Country: " + persons[j].personCountry + "</h2>";
                                    font += "<h2>City: " + persons[j].personCity + "</h2>";
                                    if (persons[j].personMainMajor == 1) font += "<h2>Major: Computer Science</h2>";
                                    else if (persons[j].personMainMajor == 2) font += "<h2>Major: Electrical enginering</h2>";
                                    else if (persons[j].personMainMajor == 3) font += "<h2>Major: Mathematics</h2>";
                                    else if (persons[j].personMainMajor == 4) font += "<h2>Major: Other</h2>";
                                    font += "<h2>General Skill: Skill" + persons[j].personGeneralSkill1 + "</h2>";
                                    font += "<h2>General Skill: Skill" + persons[j].personGeneralSkill2 + "</h2>";
                                    font += "<h2>Email: " + persons[j].personEmail + "</h2>";
                                    font += "<a href='http://localhost:5000/viewcv/"+ persons[j].personCVfileName +"'>View CV</a>";
                                    font += "<br><br>";
                                    $("body").append(font);
                                }
                            }
                            break;
                        }
                    }
                    res.writeHead(200 , {'Content-Type' : 'text/html'});
                    res.end($.html());
                });
            });
        });
    }catch(err){
        console.log(err);
    }
}