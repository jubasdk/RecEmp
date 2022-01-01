const path = require('path');
const cheerio = require('cheerio');
const fs = require('fs'); 
const {Job} = require("../models/schema");
const {Apply} = require("../models/schema");

exports.LastKeyWords = "";

exports.SearchJobs = (req , res , next) => {
    try{
        fs.readFile(path.join(__dirname , '../Views/home.html') , function(err , data){
            if (err) throw err;
            let $ = cheerio.load(data);
            $("body").append("<a href='http://localhost:5000/home'>Return to home</a><br>");
            exports.LastKeyWords = req.body.keywords;
            var input = req.body.keywords.split(' ');
            Job.find(function(err , jobs){
                if (err) throw err;
                Apply.find(function(err , data2){
                    if (err) throw err;
                    var font = "";
                    var applied = false;
                    var jdisc;
                    var found = false;
                    for (var i = 0 ; i < jobs.length ; i++){
                        found = false;
                        jdisc = jobs[i].jobDescription.split(' ');
                        for (var inp = 0 ; inp < input.length ; inp++){
                            for (var jd = 0 ; jd < jdisc.length ; jd++){
                                if (input[inp] == jdisc[jd]){
                                    found = true;
                                    break;
                                }
                            }
                            if (found) break;
                        }
                        if (found){
                            applied = false;
                            font = "";
                            if (jobs[i].jobMajor == 1) font += "<h3>Required major: Computer Science</h3>";
                            else if (jobs[i].jobMajor == 2) font += "<h3>Required major: Electrical engeniring</h3>";
                            else if (jobs[i].jobMajor == 3) font += "<h3>Required major: Mathematics</h3>";
                            else if (jobs[i].jobMajor == 4) font += "<h3>Required major: Other</h3>";
                            font += "<h3>Required skill: Skill "+ jobs[i].jobGeneralSkill1 + "</h3>";
                            font += "<h3>Required skill: Skill "+ jobs[i].jobGeneralSkill2 + "</h3>";
                            font += "<h2>Job Description<h2>";
                            font += "<h4>" + jobs[i].jobDescription + "</h4>";
                            for (var j = 0 ; j < data2.length ; j++){
                                if (data2[j].applyJobID == jobs[i].jobID && require("../Controllers/login").USERID == data2[j].applyPersonID){
                                    font += "<h3>You applied here</h3>";
                                    applied = true;
                                    break;
                                }
                            }
                            if (!applied) font += "<button id='A" + jobs[i].jobID + "'>Apply for this Job</button>";
                            font += "<button id='" + jobs[i].jobID + "'>Open Questions and answers</button>";
                            font += "<br><br>";
                            $("body").append(font);
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
                    JS += ".then(body => {window.location.href = 'http://localhost:5000/searchjobsusingkeywords';});";
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
    }catch(err){
        console.error(err);
    }
}


exports.SearchJobsGet = (req , res , next) => {
    try{
        fs.readFile(path.join(__dirname , '../Views/home.html') , function(err , data){
            if (err) throw err;
            let $ = cheerio.load(data);
            var input = exports.LastKeyWords.split(' ');
            Job.find(function(err , jobs){
                if (err) throw err;
                Apply.find(function(err , data2){
                    if (err) throw err;
                    var font = "";
                    var applied = false;
                    var jdisc;
                    var found = false;
                    for (var i = 0 ; i < jobs.length ; i++){
                        found = false;
                        jdisc = jobs[i].jobDescription.split(' ');
                        for (var inp = 0 ; inp < input.length ; inp++){
                            for (var jd = 0 ; jd < jdisc.length ; jd++){
                                if (input[inp] == jdisc[jd]){
                                    found = true;
                                    break;
                                }
                            }
                            if (found) break;
                        }
                        if (found){
                            applied = false;
                            font = "";
                            if (jobs[i].jobMajor == 1) font += "<h3>Required major: Computer Science</h3>";
                            else if (jobs[i].jobMajor == 2) font += "<h3>Required major: Electrical engeniring</h3>";
                            else if (jobs[i].jobMajor == 3) font += "<h3>Required major: Mathematics</h3>";
                            else if (jobs[i].jobMajor == 4) font += "<h3>Required major: Other</h3>";
                            font += "<h3>Required skill: Skill "+ jobs[i].jobGeneralSkill1 + "</h3>";
                            font += "<h3>Required skill: Skill "+ jobs[i].jobGeneralSkill2 + "</h3>";
                            font += "<h2>Job Description<h2>";
                            font += "<h4>" + jobs[i].jobDescription + "</h4>";
                            for (var j = 0 ; j < data2.length ; j++){
                                if (data2[j].applyJobID == jobs[i].jobID && require("../Controllers/login").USERID == data2[j].applyPersonID){
                                    font += "<h3>You applied here</h3>";
                                    applied = true;
                                    break;
                                }
                            }
                            if (!applied) font += "<button id='A" + jobs[i].jobID + "'>Apply for this Job</button>";
                            font += "<button id='" + jobs[i].jobID + "'>Open Questions and answers</button>";
                            font += "<br><br>";
                            $("body").append(font);
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
                    JS += ".then(body => {window.location.href = 'http://localhost:5000/searchjobsusingkeywords';});";
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
    }catch(err){
        console.error(err);
    }
}