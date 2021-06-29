const express = require('express');
const app = express();
const env = require('dotenv');
const mongoose = require('mongoose');
const path = require ('path');
const cors = require('cors');


//setting routes
const authRoutes = require('./routes/auth');
const adminauthRoutes = require('./routes/admin/auth');
const CategoryRoutes = require('./routes/category');
const ProductRoutes = require('./routes/product');
const CartRoutes = require('./routes/cart');



env.config();

mongoose.connect(`mongodb+srv://${process.env.Mongo_db_user}:${process.env.Mongo_db_password}@cluster0.oonmb.mongodb.net/${process.env.Mongo_db_database}?retryWrites=true&w=majority`,
{
    useNewUrlParser:true,
    useUnifiedTopology:true,
    useCreateIndex:true

}).then(()=>{
    console.log("Database Connected");
});



app.use(express.json());
app.use(cors());
app.use('/public',express.static(path.join(__dirname,'uploads')));
app.use('/api',authRoutes);
app.use('/api',adminauthRoutes);
app.use('/api',CategoryRoutes);
app.use('/api',ProductRoutes);
app.use('/api',CartRoutes);




app.listen(process.env.PORT, () => {
    console.log(`Server is running on port ${process.env.PORT}`);
  });






