var env = process.env.NODE_ENV || 'development';
console.log('env *****************', env)
if(env === 'produciton'){
  console.log('no')
  process.env.PORT = 3000;
  process.env.MONGODB_URI ='mongodb://127.0.0.1:27017/TodoApp'
}else if(env === 'test'){
  console.log('yes')
  process.env.port = 3000;
  process.env.MONGODB_URI =  'mongodb://127.0.0.1:27017/TodoAppTest'
}


const _ = require('lodash');
const express = require('express');
const bodyParser = require('body-parser');
const {ObjectID} = require('mongodb')
var {mongoose} = require('./db/mongoose');
var {Todo} = require('./models/todo');
var {User} = require('./models/user');

const app = express();
const port = process.env.PORT
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

app.delete('/todos/:id', (req,res) => {
  var id = req.params.id;

  if(!ObjectID.isValid(id)){
    return res.status(404).send();
  }

  Todo.findByIdAndRemove(id).then((todo) => {
    if(!todo){
      return res.status(404).send();
    }

    res.send({todo});
  }).catch((e) => {
    res.status(400).send();
  })
})

app.patch('/todos/:id', (req,res) => {
  var id = req.params.id;
  var body = _.pick(req.body, ['text', 'completed']);

  if(!ObjectID.isValid(id)){
    return res.status(404).send();
  }

  if(_.isBoolean(body.completed) && body.completed){
    body.completedAt = new Date().getTime();
  }else {
    body.completed = false;
    body.completedAt = null;
  }

  Todo.findByIdAndUpdate(id, {$set: body}, {new: true}).then((todo) => {
    if(!todo){
      return res.status(404).send();
    }
    res.send({todo})
  }).catch((e) => {
    res.status(400).send();
  })
})

app.listen(port, () =>{
  console.log(`Started on port ${port}`)
});

module.exports = {app};
