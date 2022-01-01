const mongoose = require('mongoose');
const PersonSchema = new mongoose.Schema({
    personID:{
        type:Number,
        unique:true
    } , 
    personFullName:{
        type:String
    } , 
    personAge:{
        type:Number
    } ,
    personCountry:{
        type:Number
    } , 
    personCity:{
        type:Number
    } , 
    personMainMajor:{
        type:Number
    } , 
    personGeneralSkill1:{
        type:Number
    } , 
    personGeneralSkill2:{
        type:Number
    } , 
    personCVfileName:{
        type:String
    } , 
    personEmail:{// login using email and password only
        type:String , 
        unique:true
    } , 
    personPassword:{
        type:String
    }
});
const CompanySchema = new mongoose.Schema({
    companyID:{
        type:Number , 
        unique:true
    } , 
    companyName:{
        type:String
    } , 
    companyDescription:{
        type:String
    } , 
    companyUserName:{
        type:String , 
        unique:true
    } , 
    companyPassword:{
        type:String
    }
});
const JobSchema =  new mongoose.Schema({
    jobID:{
        type:Number , 
        unique:true
    } , 
    jobMajor:{
        type:Number
    } , 
    jobGeneralSkill1:{
        type:Number
    } , 
    jobGeneralSkill2:{
        type:Number
    } , 
    jobDescription:{
        type:String
    } , 
    jobCompanyID:{
        type:Number
    }
});
const ApplySchema = new mongoose.Schema({
    applyJobID:{
        type:Number
    } , 
    applyPersonID:{
        type:Number
    }
});
const JobQuestionSchema = new mongoose.Schema({
    JQID:{
        type:Number , 
        unique:true
    } , 
    JQuestion:{
        type:String
    } , 
    JobID:{
        type:Number
    }
});
const JQAnswerSchema = new mongoose.Schema({//one to one relation
    JQAID:{
        type:Number , 
        unique:true
    } , 
    JQAnswer:{
        type:String
    } , 
    JobQuestionID:{
        type:Number
    }
});




module.exports = {
    Person : mongoose.model("Person" , PersonSchema) , 
    Company : mongoose.model("Company" , CompanySchema) , 
    Job : mongoose.model("Job" , JobSchema) , 
    Apply : mongoose.model("Apply" , ApplySchema) , 
    JobQuestions : mongoose.model("JobQuestions" , JobQuestionSchema) , 
    JQAnswer : mongoose.model("JQAnswer" , JQAnswerSchema) , 
};






