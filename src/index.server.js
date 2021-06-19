const express = require('express');
const app = express();
const env = require('dotenv');
const mongoose = require('mongoose');


//setting routes
const authRoutes = require('./routes/auth');
const adminauthRoutes = require('./routes/admin/auth');
const CategoryRoutes = require('./routes/category');



env.config();

mongoose.connect(`mongodb+srv://${process.env.Mongo_db_user}:${process.env.Mongo_db_password}@cluster0.oonmb.mongodb.net/${process.env.Mongo_db_database}?retryWrites=true&w=majority`,
{
    useNewUrlParser:true,
    useUnifiedTopology:true,
    useCreateIndex:true

}).then(()=>{
    console.log("Database Connected");
});




app.use('/api',authRoutes);
app.use('/api',adminauthRoutes);
app.use('/api',CategoryRoutes);


app.use(express.json());

app.listen(process.env.PORT,()=>{

 console.log(`Server is running on ${process.env.PORT}`);

});







