const {JQAnswer} = require("../models/schema");
exports.AddAnswer = (req , res , next) => {
    console.log("called");
    try{
        JQAnswer.find(function(err , data){
            if (err) throw err;
            var maxID = 0;
            for (var i = 0 ; i < data.length ; i++){
                if (data[i].JQAID > maxID) maxID = data[i].JQAID;
            }
            maxID++;
            const data1 = {
                JQAID : maxID , 
                JQAnswer : req.body.QuestionAnswer , 
                JobQuestionID : Number(req.body.QuestionID)
            };
            new JQAnswer(data1).save().then(function(){
                console.log("answer added succefully");
                res.writeHead(200 , {"Content-Type" : "text/plain"});
                res.end("added succefully");
            });
        });
    }catch(err){
        console.error(err);
    }
}