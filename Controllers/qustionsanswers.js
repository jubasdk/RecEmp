const path = require("path");
const fs = require('fs'); 
const cheerio = require('cheerio');
const {JobQuestions} = require("../models/schema");
const {JQAnswer} = require("../models/schema");

function makeQuestionsAnswersHtmlCompany(jobID , res){
    fs.readFile(path.join(__dirname , '../Views/questionsanswers.html') , function(err , data){
        if(err) throw err;
        let $ = cheerio.load(data);
        var font = "";
        var haveanswer = false;
        $("body").append("<a href='http://localhost:5000/home'>Return to home</a><br>");
        try{
            JobQuestions.find(function(err , data){
                if (err) throw err;
                JQAnswer.find(function(err , data2){
                    if (err) throw err;
                    for (var i = 0 ; i < data.length ; i++){
                        if (data[i].JobID == jobID){
                            haveanswer = false;
                            font = "<h1>Question</h1>";
                            font += "<h3>" + data[i].JQuestion + "</h3>";
                            for (var j = 0 ; j < data2.length ; j++){
                                if (data2[j].JobQuestionID == data[i].JQID){
                                    font += "<h2>Answer</h2>";
                                    font += "<h3>" + data2[j].JQAnswer + "</h3>";
                                    haveanswer = true;
                                    break;
                                }   
                            }
                            if (!haveanswer) {
                                font += "<input type='text' id='A" + data[i].JQID + "'><br>";
                                font += "<button id='" + data[i].JQID + "'>Add answer</button>";
                            }
                            $("body").append(font);
                        }
                    }
                    var JSC = "<script>";
                    JSC += "window.addEventListener('load', (event0) => {";
                    JSC += "let btns = document.querySelectorAll('button');";
                    JSC += "btns.forEach(btn => {";
                    JSC += "btn.addEventListener('click', event => {";
                    JSC += "var textID = 'A';";
                    JSC += "textID = textID.concat(event.target.id.toString());";
                    JSC += "const data1 = {QuestionID : event.target.id.toString() , ";
                    JSC += "QuestionAnswer : ";
                    JSC += "document.getElementById(textID).value"; 
                    JSC +="};";
                    JSC += "if (document.getElementById(textID).value != ''){";
                    JSC += "fetch('http://localhost:5000/addanswer' , {";
                    JSC += "method : 'post' , ";
                    JSC += "body : JSON.stringify(data1) , ";
                    JSC += "headers : new Headers({'Content-Type' : 'application/json'}) })";
                    JSC += ".then(res => {return res.text();})";
                    JSC += ".then(body => {";
                    JSC += "const data2 = {ButtonID : '" + jobID + "'};";
                    JSC += "fetch('http://localhost:5000/questionsanswers' , {";
                    JSC += "method : 'post' , ";
                    JSC += "body : JSON.stringify(data2) , ";
                    JSC += "headers : new Headers({'Content-Type' : 'application/json'}) })";
                    JSC += ".then(res => {return res.text();})";
                    JSC += ".then(html => {document.open();document.write(html);document.close();});";
                    JSC += "});"
                    JSC += "}";
                    JSC += "});";
                    JSC += "});";
                    JSC += "});";
                    JSC += "</script>";
                    $("body").append(JSC);
                    res.writeHead(200 , {'Content-Type' : 'text/html'});
                    res.end($.html());
                });
            });
        }catch(err){
            console.error(err);
        }
    });
}

function makeQuestionsAnswersHtmlPerson(jobID , res){
    fs.readFile(path.join(__dirname , '../Views/questionsanswers.html') , function(err , data){
        try{
            if (err) throw err;
            let $ = cheerio.load(data);
            var font = "";
            $("body").append("<a href='http://localhost:5000/home'>Return to home</a><br>");
            $("body").append("<input type='text' id='question'>");
            $("body").append("<button id='addquestion'>Add question</button>");
            JobQuestions.find(function(err , data){
                if (err) throw err;
                JQAnswer.find(function(err , data2){
                    if (err) throw err;
                    for (var i = 0 ; i < data.length ; i++){
                        if (data[i].JobID == jobID){
                            font = "<h1>Question</h1>";
                            font += "<h3>" + data[i].JQuestion + "</h3>";
                            for (var j = 0 ; j < data2.length ; j++){
                                if (data2[j].JobQuestionID == data[i].JQID){
                                    font += "<h2>Answer</h2>";
                                    font += "<h3>" + data2[j].JQAnswer + "</h3>";
                                    break;
                                }   
                            }
                            $("body").append(font);
                        }
                    }
                    var JS = "<script>";
                    JS += "window.addEventListener('load', (event0) => {";
                    JS += "const btn = document.getElementById('addquestion');";
                    JS += "btn.addEventListener('click' , function(){";
                    JS += "const data = {";
                    JS += "JOBID : " + jobID + " , ";
                    JS += "QUESTION : document.getElementById('question').value";
                    JS += "};";
                    JS += "if (document.getElementById('question').value != ''){";
                    JS += "fetch('http://localhost:5000/addquestion' , {";
                    JS += "method : 'post' , ";
                    JS += "body : JSON.stringify(data) , ";
                    JS += "headers : new Headers({'Content-Type' : 'application/json'}) })";
                    JS += ".then(res => {return res.text();})";
                    JS += ".then(body => {";
                    JS += "const data1 = {ButtonID : '" + jobID + "'};";
                    JS += "fetch('http://localhost:5000/questionsanswers' , {";
                    JS += "method : 'post' , ";
                    JS += "body : JSON.stringify(data1) , ";
                    JS += "headers : new Headers({'Content-Type' : 'application/json'}) })";
                    JS += ".then(res => {return res.text();})";
                    JS += ".then(html => {document.open();document.write(html);document.close();});";
                    JS += "});";
                    JS += "}";
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


exports.SendQuestionsAnswersPage = (req , res , next) => {
    if (require("../Controllers/login").USERTYPE == "company"){
        makeQuestionsAnswersHtmlCompany(Number(req.body.ButtonID) , res);
    }
    else if (require("../Controllers/login").USERTYPE == "person"){
        makeQuestionsAnswersHtmlPerson(Number(req.body.ButtonID) , res);
    }
}