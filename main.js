const fetch = require('node-fetch');
const path = require('path');
const express = require('express');
const dotenv = require('dotenv');
const cors = require('cors');
var fs = require("fs");
let bodyParser = require('body-parser');
dotenv.config({ path: './config/config.env' });
//const connectDB = require('./config/db');
const PORT = process.env.PORT || 5000;
const app = express();
app.use(express.json());
app.use(cors());
app.use(bodyParser.urlencoded({ extended: false }));
require("./config/db").connectDB();
app.get('/' , (req , res)=>{res.redirect('login');})
app.use('/login' , require("./Routes/login"));
app.use('/signup' , require('./Routes/signup'));
app.use('/upload' , require('./Routes/uploadcv'));
app.use('/home' , require("./Routes/home"));
app.use('/postajob' , require("./Routes/postajob"));
app.use('/questionsanswers' , require("./Routes/questionsanswers"));
app.use('/addquestion' , require("./Routes/addquestion"));
app.use('/addanswer' , require("./Routes/addanswer"));
app.use('/applyforjob' , require("./Routes/applyforjob"));
app.use('/viewapplied' , require("./Routes/viewapplied"));
app.use('/viewcv' , require("./Routes/viewcv"));
app.use('/deletejob' , require("./Routes/deletejob"));
app.use('/recommendforcompany' , require("./Routes/recommendforcompany"));
app.use('/recommendforperson' , require("./Routes/recommendforperson"));
app.use('/searchjobsusingkeywords' , require("./Routes/searchjobsusingkeywords"));
app.listen(PORT , () => 
console.log(`Server starts in ${process.env.NODE_ENV} mode on port ${PORT}`));


