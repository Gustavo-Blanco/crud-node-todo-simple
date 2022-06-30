const express = require('express');
const cors = require('cors');
const app = express();
const morgan = require('morgan');

app.use(cors());
app.use(morgan('dev'));
app.use(express.json())
app.use(express.urlencoded({extended: false}))

let todos = [];

app.get('/todos', (req, res) => {
    return res.json(todos)
});

app.post('/store', (req, res) => {
    console.log(req.body);
    if(todos.length == 0){
        req.body.id = 1;
        todos.push(req.body);
        return res.json(req.body);
    }
    const max = todos.reduce((prev, current) => {
        return (prev.id > current.id) ? prev : current
    });
    req.body.id = max.id + 1;
    todos.push(req.body);
    return res.json(req.body);
});

app.put('/update/:id', (req, res) => {
    todos = todos.map(todo => {
        console.log(todo.id,req.params.id , todo.id == req.params.id);
        if(todo.id == req.params.id) return {...todo,...req.body};
        return todo;
    });
    const todo = todos.find(todo => todo.id == req.params.id);
    return res.json(todo);
});

app.get('/show/:id', (req, res) => {
    const todo = todos.find(todo => todo.id == req.params.id);
    return res.json(todo);
});

app.delete('/delete/:id', (req, res) => {
    for (let i = 0; i < todos.length; i++) {
        if(todos[i].id == req.params.id){
            todos.splice(i, 1);
        }
        
    };
    return res.json(todos);
});

app.listen(3002, () => {
    console.log('listen port 3002');
})


