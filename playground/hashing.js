const {SHA256} = require('crypto-js')
const jwt = require('jsonwebtoken');

var data = {
  id:10
};

var token = jwt.sign(data, '123abc')
console.log(token);

var decoded = jwt.verify(token, '123abc')
console.log(token, decoded);

//JWT example
// const message = 'I am user number 3';
// var hash = SHA256(message).toString();
//
// console.log(`Message : ${message}`);
// console.log(`Hash : ${hash}`);

// var data = {
//    id:4
// };
//
// var token = {
//   data,
//   hash: SHA256(JSON.stringify(data) + 'somebodyoncetoldme').toString()
// }
//
// //middleman to change result, so the salt is different
// // token.data.id = 5;
// // token.hash = SHA256(JSON.stringify(token.data)).toString();
//
// var resultHash = SHA256(JSON.stringify(token.data) + 'somebodyoncetoldme').toString();
//
// if(resultHash === token.hash){
//   console.log('Data was not changed');
// }
// else{
//   console.log('dont trust this blud');
// }
