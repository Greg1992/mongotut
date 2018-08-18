var mongoose = require('mongoose');
var keys = require('./../config/keys')
mongoose.Promise = global.Promise;

mongoose.connect(process.env.MONGODB_URI || keys.mongodb.dbURI || 'mongodb://127.0.0.1:27017/TodoApp' , ()=>{
  console.log('connecyte')
})




module.exports = {mongoose};
