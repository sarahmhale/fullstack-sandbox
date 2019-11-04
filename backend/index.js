const express = require('express')
const cors = require('cors')
const app = express()

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cors())

const PORT = 3001

let toDos = {
    '0000000001': {
        id: '0000000001',
        title: 'Bacon List',
        completed: false,
        toDos: [{ text: 'First todo of first list!', completed: false }],

    },
    '0000000002': {
        id: '0000000002',
        title: 'Second List',
        completed: false,
        toDos: [{ text: 'First todo of second list!', completed: false }]
    }
}

app.get('/toDos', (req, res) => {
    return res.send(toDos)
});

app.post('/toDos/:id', (req, res) => {
    toDos[req.params.id].completed = true
    req.body.toDos.map((toDo) => {
        if (!toDo.completed) {
            toDos[req.params.id].completed = false
        }
    })
    toDos[req.params.id].toDos = req.body.toDos;
    return res.send(toDos);
});

app.listen(PORT, () => console.log(`Example app listening on port ${PORT}!`))
