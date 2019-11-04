import React, { useState } from 'react'
import { makeStyles } from '@material-ui/styles'
import Card from '@material-ui/core/Card'
import CardContent from '@material-ui/core/CardContent'
import CardActions from '@material-ui/core/CardActions'
import Button from '@material-ui/core/Button'
import DeleteIcon from '@material-ui/icons/Delete'
import AddIcon from '@material-ui/icons/Add'
import Typography from '@material-ui/core/Typography'
import { TextField } from '../../shared/FormFields'

const useStyles = makeStyles({
  card: {
    margin: '1rem'
  },
  toDoLine: {
    display: 'flex',
    alignItems: 'center'
  },
  textField: {
    flexGrow: 1
  },
  standardSpace: {
    margin: '8px'
  },
  form: {
    display: 'flex',
    flexDirection: 'column',
    flexGrow: 1
  }
})

export const ToDoListForm = ({ toDoList, saveToDoList }) => {
  const blankToDo = { text: '', completed: false }
  const classes = useStyles()
  const [toDos, setToDos] = useState(toDoList.toDos)

  const handleSubmit = event => {
    event.preventDefault()
    saveToDoList(toDoList.id, { toDos })
  }

  const addToDo = () => {
    setToDos([...toDos, { ...blankToDo }])
  }

  return (
    <Card className={classes.card}>
      <CardContent>
        <Typography component='h2'>
          {toDoList.title}
        </Typography>
        <form onSubmit={handleSubmit} className={classes.form}>
          {toDos.map((toDo, index) => (
            <div key={index} className={classes.toDoLine}>
              <Typography className={classes.standardSpace} variant='h6'>
                {index + 1}
              </Typography>
              <input
                name="isCompleted"
                type="checkbox"
                checked={toDo.completed}
                onChange={() => {
                  setToDos([ // immutable update
                    ...toDos.slice(0, index),
                    { text: toDo.text, completed: !toDo.completed },
                    ...toDos.slice(index + 1)])
                }}
              />
              <TextField
                label='What to do?'
                value={toDo.text}
                onChange={event => {
                  setToDos([ // immutable update
                    ...toDos.slice(0, index),
                    { text: event.target.value, completed: false },
                    ...toDos.slice(index + 1)])
                }}
                className={classes.textField}
              />
              <Button
                size='small'
                color='secondary'
                className={classes.standardSpace}
                onClick={() => {
                  setToDos([ // immutable delete
                    ...toDos.slice(0, index),
                    ...toDos.slice(index + 1)
                  ])
                }}
              >
                <DeleteIcon />
              </Button>
            </div>
          ))}
          <CardActions>
            <Button
              type='button'
              color='primary'
              onClick={addToDo}
            >
              Add Todo <AddIcon />
            </Button>
            <Button type='submit' variant='contained' color='primary'>
              Save
            </Button>
          </CardActions>
        </form>
      </CardContent>
    </Card>
  )
}
