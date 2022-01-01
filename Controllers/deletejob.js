const {Job} = require("../models/schema");
const {Apply} = require("../models/schema");
const {JobQuestions} = require("../models/schema");
const {JQAnswer} = require("../models/schema");


exports.DeleteJob = (req , res , next) => {
    try{
        var query = { applyJobID: Number(req.body.JOBID)};
        Apply.deleteMany(query , function(err , obj){
            if (err) throw err;
            //console.log(obj.result.n + " document(s) deleted from Apply");
            JobQuestions.find(function(err , qdata){
                if (err) throw err;
                var aquery;
                for(var i = 0 ; i < qdata.length ; i++){
                    if (qdata[i].JobID == Number(req.body.JOBID)){
                        aquery = {JobQuestionID: qdata[i].JQID};
                        JQAnswer.deleteOne(aquery , function(err , obj1){
                            if (err) throw err;
                            //console.log("1 document deleted Answer");
                        });
                    }
                }
                var qquery = {JobID: Number(req.body.JOBID)};
                JobQuestions.deleteMany(qquery , function(err , obj2){
                    if (err) throw err;
                    //console.log(obj2.result.n + " document(s) deleted from Question");
                    var jquery = {jobID: Number(req.body.JOBID)};
                    Job.deleteOne(jquery , function(err , obj3){
                        if (err) throw err;
                        console.log("1 document deleted Job");
                        res.writeHead(200 , {"Content-Type" : "text/plain"});
                        res.end("Job deleted succefully");
                    });
                });
            });
        });
    }catch (err){
        console.error(err);
    }
}