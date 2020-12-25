const mongoose=require('mongoose');

const URI = "mongodb+srv://root:abhi0317@demo.mb7pd.mongodb.net/Lybio?retryWrites=true&w=majority";

mongoose.connect(URI, {useNewUrlParser: true, useUnifiedTopology: true}, (err) =>{
    if(!err){
        return console.log("The database is connected!!")
    }
    console.log('Error in db connection:' + err);
})
require("./user.model");
