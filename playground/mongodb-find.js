const MongoClient = require('mongodb').MongoClient;

MongoClient.connect('mongodb://localhost:27017/TodoApp', (err, client) => {
  if(err){
  return console.log('fucking shit its not connected to the server')
  }
  console.log('its worked')
  const db = client.db('TodoApp')
  db.collection('Todos').find().count().then((count)=>{
    console.log(`Count is ${count}`);
    console.log(JSON.stringify(docs, undefined,2));
  }, (err) => {
    console.log('Unable to fetch', err)
  });

  // client.close();

});
