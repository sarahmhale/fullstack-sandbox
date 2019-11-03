const express = require('express')
const cors = require('cors')
const app = express()

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cors())

const PORT = 3001

let todos = {
    '0000000001': {
        id: '0000000001',
        title: 'Bacon List',
        completed: false,
        todos: [{ text: 'First todo of first list!', completed: false }],

    },
    '0000000002': {
        id: '0000000002',
        title: 'Second List',
        completed: false,
        todos: [{ text: 'First todo of second list!', completed: false }]
    }
}

app.get('/todos', (req, res) => {
    return res.send(todos)
});

app.post('/todos/:id', (req, res) => {
    todos[req.params.id].completed = true
    req.body.todos.map((todo) => {
        if (!todo.completed) {
            todos[req.params.id].completed = false
        }
    })
    todos[req.params.id].todos = req.body.todos;
    return res.send(todos);
});

app.listen(PORT, () => console.log(`Example app listening on port ${PORT}!`))
