const mongoose = require('mongoose');
let gfs;
exports.connectDB = async () =>{
    try{
        const conn = await mongoose.connect(process.env.MONGO_URI , 
            {
                useNewUrlParser : true , 
                useUnifiedTopology : true
            });
        console.log('database connected: ' + conn.connection.host);
        //let gfs;
        gfs = new mongoose.mongo.GridFSBucket(conn.connection.db, {
            bucketName: "CVs"
        });
        
    }catch(error){
        console.error(error);
        process.exit(1);
    }
}
exports.ViewCV = (req , res , next) => {
    const file = gfs
      .find({
        filename: req.params.filename
      })
      .toArray((err, files) => {
        if (!files || files.length === 0) {
          return res.status(404).json({
            err: "no files exist"
          });
        }
        gfs.openDownloadStreamByName(req.params.filename).pipe(res);
      });
}





