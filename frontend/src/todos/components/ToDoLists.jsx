import React, { Fragment, useState, useEffect } from 'react'
import Card from '@material-ui/core/Card'
import CardContent from '@material-ui/core/CardContent'
import List from '@material-ui/core/List'
import ListItem from '@material-ui/core/ListItem'
import ListItemText from '@material-ui/core/ListItemText'
import ListItemIcon from '@material-ui/core/ListItemIcon'
import ReceiptIcon from '@material-ui/icons/Receipt'
import Typography from '@material-ui/core/Typography'
import { ToDoListForm } from './ToDoListForm'
import axios from 'axios';


const getPersonalToDos = (setToDoLists) => {
  return axios.get("http://127.0.0.1:3001/toDos")
    .then(res => setToDoLists(res.data))
    .catch(error => console.log(error))
}
const postPersonalToDos = (id, toDos, setToDoLists) => {
  return axios.post(`http://127.0.0.1:3001/toDos/${id}`, { toDos })
    .then(res => setToDoLists(res.data))
    .catch(error => console.log(error))
}

export const ToDoLists = ({ style }) => {
  const [toDoLists, setToDoLists] = useState({})
  const [activeList, setActiveList] = useState()

  useEffect(() => {
    getPersonalToDos(setToDoLists)
  }, [])

  if (!Object.keys(toDoLists).length) return null
  return <Fragment>
    <Card style={style}>
      <CardContent>
        <Typography
          component='h2'
        >
          My ToDo Lists
        </Typography>
        <List>
          {Object.keys(toDoLists).map((key) => <ListItem
            key={key}
            button
            onClick={() => setActiveList(key)}
          >
            <ListItemIcon>
              <ReceiptIcon />
            </ListItemIcon>
            <ListItemText primary={toDoLists[key].title} />
            {toDoLists[key].completed ?
              <Typography
                component='h2'
              >
                Completed
        </Typography> : null}
          </ListItem>)}
        </List>
      </CardContent>
    </Card>
    {toDoLists[activeList] && <ToDoListForm
      key={activeList} // use key to make React recreate component to reset internal state
      toDoList={toDoLists[activeList]}
      saveToDoList={(id, { toDos }) => {
        postPersonalToDos(id, toDos, setToDoLists)
      }}
    />}
  </Fragment>
}
