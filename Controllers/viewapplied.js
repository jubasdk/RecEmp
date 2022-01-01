const {Apply} = require("../models/schema");
const {Person} = require("../models/schema");
const path = require("path");
const fs = require('fs');
const cheerio = require('cheerio');

function MakeHtmlForApplied(res , jobID){
    fs.readFile(path.join(__dirname , '../Views/home.html') , function(err , data){
        try{
            if (err) throw err;
            let $ = cheerio.load(data);
            $("body").append("<a href='http://localhost:5000/home'>Return to home</a><br>");
            Apply.find(function(err , data){
                if (err) throw err;
                Person.find(function(err , data2){
                    if (err) throw err;
                    var font = "";
                    for (var i = 0 ; i < data.length ; i++){
                        if (data[i].applyJobID == jobID){
                            for (var j = 0 ; j < data2.length ; j++){
                                if (data2[j].personID == data[i].applyPersonID){
                                    font = "<h2>Name: " + data2[j].personFullName + "</h2>";
                                    font += "<h2>Age: " + data2[j].personAge + "</h2>";
                                    font += "<h2>Country: " + data2[j].personCountry + "</h2>";
                                    font += "<h2>City: " + data2[j].personCity + "</h2>";
                                    if (data2[j].personMainMajor == 1) font += "<h2>Major: Computer Science</h2>";
                                    else if (data2[j].personMainMajor == 2) font += "<h2>Major: Electrical enginering</h2>";
                                    else if (data2[j].personMainMajor == 3) font += "<h2>Major: Mathematics</h2>";
                                    else if (data2[j].personMainMajor == 4) font += "<h2>Major: Other</h2>";
                                    font += "<h2>General Skill: Skill" + data2[j].personGeneralSkill1 + "</h2>";
                                    font += "<h2>General Skill: Skill" + data2[j].personGeneralSkill2 + "</h2>";
                                    font += "<h2>Email: " + data2[j].personEmail + "</h2>";
                                    font += "<a href='http://localhost:5000/viewcv/"+ data2[j].personCVfileName +"'>View CV</a>";
                                    font += "<br><br>";
                                    $("body").append(font);
                                    break;
                                }
                            }
                        }
                    }
                    res.writeHead(200 , {'Content-Type' : 'text/html'});
                    res.end($.html());
                });
            });
        }catch (err){
            console.error(err);
        }
    });
}

exports.ViewCustomersApplied = (req , res , next) => {
    MakeHtmlForApplied(res , Number(req.body.JobID));
}