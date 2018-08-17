const MongoClient = require('mongodb').MongoClient;

MongoClient.connect('mongodb://localhost:27017/TodoApp', (err, client) => {
  if(err){
  return console.log('fucking shit its not connected to the server')
  }
  console.log('its worked')
  const db = client.db('TodoApp')

  db.collection('Todos').insertOne({
    text: 'Something to do',
    completed: false
  }, (err, result) => {
    if(err){
      return console.log('collections bit failed', err)
    }
    console.log('Cool it worked' + JSON.stringify(result.ops, undefined, 2))
  })
  client.close();
});
