const express = require('express');
const env=require('dotenv');
const app=express();
const bodyParser=require('body-parser');
const mongoose = require('mongoose')

//routes
const authRoutes=require('./routes/auth');

//environment variables
env.config();

//mongodbconnection
//mongodb+srv://root:<password>@cluster0.oonmb.mongodb.net/myFirstDatabase?retryWrites=true&w=majority

mongoose.connect(`mongodb+srv://${process.env.Mongo_db_user}:${process.env.Mongo_db_password}@cluster0.oonmb.mongodb.net/${process.env.Mongo_db_database}?retryWrites=true&w=majority`, 
{
    useNewUrlParser: true,
     useUnifiedTopology: true,
     useCreateIndex:true
}).then(()=>{

    console.log("Database Connected");
});



//middleware
app.use(bodyParser());
app.use('/api',authRoutes);







app.listen(process.env.PORT,()=>{

    console.log(`Server is Running on port ${process.env.PORT}`);
}
);

