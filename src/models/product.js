const mongoose = require('mongoose');

const productSchema = new mongoose.Schema(
{
     name:{
         type:String,
         required:true,
         trim:true
     },
     slug:{
         type:String,
         required:true,
         unique:true
     },
     price:{
         type:Number,
         required:true
     },
     description:{
        type:String,
        required:true
     },
     offer:{type:Number},
     
     productpictures:[
         {
             img:{type:String,required:true},
             
         }
     ],
     reviews:[
         {
             userid:{type:mongoose.Schema.Types.ObjectId,ref:'User'},
             review:{type:String}
         }
     ],
     createdby:{type:mongoose.Schema.Types.ObjectId,ref:'User',required:true},
     upadtedAt:{type:Date},
     category:{type:mongoose.Schema.Types.ObjectId,ref:'Category',required:true},
     quantity:{type:Number,required:true}

},{timestamps:true}

)

module.exports = mongoose.model("Product",productSchema);