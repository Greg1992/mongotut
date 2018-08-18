const express = require('express');
const bodyParser = require('body-parser');
const {ObjectID} = require('mongodb')
var {mongoose} = require('./db/mongoose');
var {Todo} = require('./models/todo');
var {User} = require('./models/user');

const app = express();
const port = process.env.PORT || 3000
app.use(bodyParser.json());

app.post('/todos', (req,res) => {
  var todo = new Todo({
    text: req.body.text
  });
  todo.save().then((doc) => {
    res.send(doc);
  },(e) => {
  res.status(400).send(e)
})
});

app.get('/todos', (req,res) => {
  Todo.find().then((todos) => {
    res.send({todos}) //use object instead of array so you can tack on extra info
  }, (e) => {
    res.status(400).send(e);
  })

});

app.get('/todos/:id', (req,res) => {

  const id = req.params.id
  if(!ObjectID.isValid(id)){
    res.status(404).send();
  }
  Todo.findById(id).then((todo) => {
    if(!todo){
      return res.status(404).send()
    }
  res.status(200).send({todo});
}).catch((e) => res.status(400).send());
})

app.listen(port, () =>{
  console.log(`Started on port ${port}`)
});

module.exports = {app};
