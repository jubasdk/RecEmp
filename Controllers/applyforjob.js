const {Apply} = require("../models/schema");
exports.ApplyForJob = (req , res , next) => {
    const data = {
        applyJobID : Number(req.body.JOBID) , 
        applyPersonID : require("../Controllers/login").USERID
    };
    new Apply(data).save().then(function(){
        console.log("applied succefully");
        res.writeHead(200 , {"Content-Type" : "text/palin"});
        res.end("applied succefully");
    });
}