const MongoClient = require('mongodb').MongoClient;

MongoClient.connect('mongodb://localhost:27017/TodoApp', (err, client) => {
  if(err){
  return console.log('fucking shit its not connected to the server')
  }
  console.log('its worked')
  const db = client.db('TodoApp')

//delete many
  // db.collection('Todos').deleteMany({text:'Something to do'}).then((result) => {
  //   console.log(result)
  // })

//deleteOne
// db.collection('Todos').deleteOne({text: 'Something to do'}).then((result) => {
//   console.log(result)
// })

//findOneanddelete

db.collection('Todos').findOneAndDelete({completed: false}).then((result) => {
  console.log(result)
})
  // client.close();

});
