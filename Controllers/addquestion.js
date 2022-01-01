const {JobQuestions} = require("../models/schema");


exports.AddQuestion = (req , res , next) => {
    try{
        JobQuestions.find(function(err , data){
            if (err) throw err;
            var maxID = 0;
            for (var i = 0 ; i < data.length ; i++){
                if (data[i].JQID > maxID) maxID = data[i].JQID;
            }
            maxID++;
            const data1 = {
                JQID : maxID , 
                JQuestion : req.body.QUESTION , 
                JobID : req.body.JOBID
            };
            new JobQuestions(data1).save().then(function(){
                console.log("question added succefully");
                res.writeHead(200 , {"Content-Type" : "text/plain"});
                res.end("added succefully");
            });

        });
    }catch(err){
        console.error(err);
    }
}