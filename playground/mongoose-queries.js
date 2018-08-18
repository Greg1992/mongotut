const {mongoose} = require('./../server/db/mongoose');
const {Todo} = require('./../server/models/todo');

var id = '5b78823507f34d256487a44f'

Todo.find({
  _id:id
}).then((todos) => {
  console.log('Todos', todos)
})

Todo.findOne({
  _id:id
}).then((todo) => {
  console.log('Todos', todo)
})

Todo.findById(id).then((todo) => {
  if(!todo){
    return console.log('Id not found')
  }
  console.log('Todo By Id', todo);
});
