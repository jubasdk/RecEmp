const path = require('path');
const cheerio = require('cheerio');
const fs = require('fs'); 
const {Job} = require("../models/schema");
const {Apply} = require("../models/schema");

function makeHtmlForCompany(res){
    fs.readFile(path.join(__dirname , '../Views/home.html') , function(err , data){
        if(err) throw err;
        let $ = cheerio.load(data);
        try{
            Job.find(function(err , data){
                if (err) throw err;
                $("body").append("<h1>Posted Jobs</h1>");
                for (var i = 0 ; i < data.length ; i++){
                    if (data[i].jobCompanyID == require("../Controllers/login").USERID){
                        var jobfont = "";
                        if (data[i].jobMajor == 1) jobfont += "<h3>Required major: Computer Science</h3>";
                        else if (data[i].jobMajor == 2) jobfont += "<h3>Required major: Electrical engeniring</h3>";
                        else if (data[i].jobMajor == 3) jobfont += "<h3>Required major: Mathematics</h3>";
                        else if (data[i].jobMajor == 4) jobfont += "<h3>Required major: Other</h3>";
                        jobfont += "<h3>Required skill: Skill "+ data[i].jobGeneralSkill1 + "</h3>";
                        jobfont += "<h3>Required skill: Skill "+ data[i].jobGeneralSkill2 + "</h3>";
                        jobfont += "<h2>Job Description<h2>";
                        jobfont += "<h4>" + data[i].jobDescription + "</h4>";
                        jobfont += "<button id='" + data[i].jobID + "'>Open Questions and answers</button>";
                        jobfont += "<button id='V" + data[i].jobID + "'>View applied</button>";
                        jobfont += "<button id='R" + data[i].jobID + "'>Recommend</button>";
                        jobfont += "<button id='D" + data[i].jobID + "'>Delete Job</button>";
                        jobfont += "<br><br>";
                        $("body").append(jobfont);
                    }
                }
                $("body").append("<form action='postajob' method='get'><input type='submit' name='postjob' value='Post a Job'></form>");
                var JS = "<script>";
                JS += "window.addEventListener('load', (event0) => {";
                JS += "let btns = document.querySelectorAll('button');";
                JS += "btns.forEach(btn => {";
                JS += "btn.addEventListener('click', event => {";
                JS += "if (event.target.id.toString().charAt(0) == 'V'){";
                JS += "const data = {JobID : event.target.id.toString().substring(1)};";
                JS += "fetch('http://localhost:5000/viewapplied' , {";
                JS += "method : 'post' , ";
                JS += "body : JSON.stringify(data) , ";
                JS += "headers : new Headers({'Content-Type' : 'application/json'}) })";
                JS += ".then(res => {return res.text();})";
                JS += ".then(html => {document.open();document.write(html);document.close();});";
                JS += "}";
                JS += "else if (event.target.id.toString().charAt(0) == 'D'){";
                JS += "const data2 = {";
                JS += "JOBID : event.target.id.toString().substring(1)};";
                JS += "fetch('http://localhost:5000/deletejob' , {";
                JS += "method : 'post' , ";
                JS += "body : JSON.stringify(data2) , ";
                JS += "headers : new Headers({'Content-Type' : 'application/json'}) })";
                JS += ".then(res => {return res.text();})";
                JS += ".then(body => {window.location.href = 'http://localhost:5000/home';});";
                JS += "}";
                JS += "else if (event.target.id.toString().charAt(0) == 'R'){";
                JS += "const data3 = {JobID : event.target.id.toString().substring(1)};";
                JS += "fetch('http://localhost:5000/recommendforcompany' , {";
                JS += "method : 'post' , ";
                JS += "body : JSON.stringify(data3) , ";
                JS += "headers : new Headers({'Content-Type' : 'application/json'}) })";
                JS += ".then(res => {return res.text();})";
                JS += ".then(html => {document.open();document.write(html);document.close();});";
                JS += "}";
                JS += "else{";
                JS += "const data1 = {ButtonID : event.target.id.toString()};"
                JS += "fetch('http://localhost:5000/questionsanswers' , {";
                JS += "method : 'post' , ";
                JS += "body : JSON.stringify(data1) , ";
                JS += "headers : new Headers({'Content-Type' : 'application/json'}) })";
                JS += ".then(res => {return res.text();})";
                JS += ".then(html => {document.open();document.write(html);document.close();});";
                JS += "}";
                JS += "});";
                JS += "});";
                JS += "});";
                JS += "</script>";
                $("body").append(JS);
                res.writeHead(200 , {'Content-Type' : 'text/html'});
                res.end($.html());
            });
        }catch(err){
            console.error(err);
        }
    });
}
function makeHtmlForPerson(res){
    fs.readFile(path.join(__dirname , '../Views/home.html') , function(err , data){
        try{
            if (err) throw err;
            let $ = cheerio.load(data);
            Job.find(function(err , data){
                Apply.find(function(err , data2){
                    if (err) throw err;
                    $("body").append("<h1>All availible jobs</h1>");
                    $("body").append("<form action='recommendforperson' method='get'><input type='submit' value='View Recommended Jobs'></form>");
                    $("body").append("<br>");
                    var ser = "<form action='searchjobsusingkeywords' method='post'>";
                    ser += "<input type='text' name='keywords'>";
                    ser += "<input type='submit' value='Search'>";
                    ser += "</form>";
                    $("body").append(ser);
                    var font = "";
                    var applied = false;
                    for (var i = 0 ; i < data.length ; i++){
                        applied = false;
                        font = "";
                        if (data[i].jobMajor == 1) font += "<h3>Required major: Computer Science</h3>";
                        else if (data[i].jobMajor == 2) font += "<h3>Required major: Electrical engeniring</h3>";
                        else if (data[i].jobMajor == 3) font += "<h3>Required major: Mathematics</h3>";
                        else if (data[i].jobMajor == 4) font += "<h3>Required major: Other</h3>";
                        font += "<h3>Required skill: Skill "+ data[i].jobGeneralSkill1 + "</h3>";
                        font += "<h3>Required skill: Skill "+ data[i].jobGeneralSkill2 + "</h3>";
                        font += "<h2>Job Description<h2>";
                        font += "<h4>" + data[i].jobDescription + "</h4>";
                        for (var j = 0 ; j < data2.length ; j++){
                            if (data2[j].applyJobID == data[i].jobID && require("../Controllers/login").USERID == data2[j].applyPersonID){
                                font += "<h3>You applied here</h3>";
                                applied = true;
                                break;
                            }
                        }
                        if (!applied) font += "<button id='A" + data[i].jobID + "'>Apply for this Job</button>";
                        font += "<button id='" + data[i].jobID + "'>Open Questions and answers</button>";
                        font += "<br><br>";
                        $("body").append(font);
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
                    JS += ".then(body => {window.location.href = 'http://localhost:5000/home';});";
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
        }catch(err){
            console.error(err);
        }
    });
}

exports.sendHomePage = (req , res , next) => {
    if (require("../Controllers/login").USERTYPE == "company"){
        makeHtmlForCompany(res);
    }else if(require("../Controllers/login").USERTYPE == "person"){
        makeHtmlForPerson(res);
    }
}