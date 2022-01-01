const path = require('path');
const cheerio = require('cheerio');
const fs = require('fs'); 
const {Person} = require("../models/schema");
const {Job} = require("../models/schema");
const {Apply} = require("../models/schema");

exports.RecommendForPerson = (req , res , next) => {
    try{
        fs.readFile(path.join(__dirname , '../Views/home.html') , function(err , data){
            if (err) throw err;
            let $ = cheerio.load(data);
            $("body").append("<a href='http://localhost:5000/home'>Return to home</a><br>");
            Person.find(function(err , persons){
                if (err) throw err;
                Job.find(function(err , jobs){
                    Apply.find(function(err , data2){
                        var font = "";
                        var applied = false;
                        if (err) throw err;
                        for (var i = 0 ; i < persons.length ; i++){
                            if (persons[i].personID == require("../Controllers/login").USERID){
                                for (var j = 0 ; j < jobs.length ; j++){
                                    if (jobs[j].jobMajor == persons[i].personMainMajor){
                                        applied = false;
                                        font = "";
                                        if (jobs[j].jobMajor == 1) font += "<h3>Required major: Computer Science</h3>";
                                        else if (jobs[j].jobMajor == 2) font += "<h3>Required major: Electrical engeniring</h3>";
                                        else if (jobs[j].jobMajor == 3) font += "<h3>Required major: Mathematics</h3>";
                                        else if (jobs[j].jobMajor == 4) font += "<h3>Required major: Other</h3>";
                                        font += "<h3>Required skill: Skill "+ jobs[j].jobGeneralSkill1 + "</h3>";
                                        font += "<h3>Required skill: Skill "+ jobs[j].jobGeneralSkill2 + "</h3>";
                                        font += "<h2>Job Description<h2>";
                                        font += "<h4>" + jobs[j].jobDescription + "</h4>";
                                        for (var k = 0 ; k < data2.length ; k++){
                                            if (data2[k].applyJobID == jobs[j].jobID && require("../Controllers/login").USERID == data2[k].applyPersonID){
                                                font += "<h3>You applied here</h3>";
                                                applied = true;
                                                break;
                                            }
                                        }
                                        if (!applied) font += "<button id='A" + jobs[j].jobID + "'>Apply for this Job</button>";
                                        font += "<button id='" + jobs[j].jobID + "'>Open Questions and answers</button>";
                                        font += "<br><br>";
                                        $("body").append(font);
                                    }
                                }
                                break;
                            }
                        }
                        var JS = "<script>";
                        JS += "window.addEventListener('load', (event0) => {";
                        JS += "let btns = document.querySelectorAll('button');";
                        JS += "btns.forEach(btn => {";
                        JS += "btn.addEventListener('click', event => {";
                        JS += "if (event.target.id.toString().charAt(0) != 'A'){";
                        JS += "const data = {ButtonID : event.target.id.toString()};";
                        JS += "fetch('http://localhost:5000/questionsanswers' , {";
                        JS += "method : 'post' , ";
                        JS += "body : JSON.stringify(data) , ";
                        JS += "headers : new Headers({'Content-Type' : 'application/json'}) })";
                        JS += ".then(res => {return res.text();})";
                        JS += ".then(html => {document.open();document.write(html);document.close();});";
                        JS += "}else{";
                        JS += "const appdata = {";
                        JS += "JOBID : event.target.id.toString().substring(1)};";
                        JS += "fetch('http://localhost:5000/applyforjob' , {";
                        JS += "method : 'post' , ";
                        JS += "body : JSON.stringify(appdata) , ";
                        JS += "headers : new Headers({'Content-Type' : 'application/json'}) })";
                        JS += ".then(res => {return res.text();})";
                        JS += ".then(body => {window.location.href = 'http://localhost:5000/recommendforperson';});";
                        JS += "}";
                        JS += "});";
                        JS += "});";
                        JS += "});";
                        JS += "</script>";
                        $("body").append(JS);
                        res.writeHead(200 , {'Content-Type' : 'text/html'});
                        res.end($.html());
                    });
                });
            });
        });
    }catch(err){
        console.error(err);
    }
}