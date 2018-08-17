const {MongoClient, ObjectID} = require('mongodb');

MongoClient.connect('mongodb://localhost:27017/TodoApp', (err, client) => {
  if(err){
  return console.log('fucking shit its not connected to the server')
  }
  console.log('its worked')
  const db = client.db('TodoApp')

//findoneandupdate

  db.collection('Todos').findOneAndUpdate(
    {
      _id:new ObjectID('5b771931524370f041e4274a')
  },
  {
      $set: {
        completed: true
      }
  },
  {
    returnOriginal: false
  }
).then((result) => {
  console.log(result)
})
  // client.close();

});
