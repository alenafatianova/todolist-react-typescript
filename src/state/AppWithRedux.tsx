import React from "react";
import {useDispatch, useSelector} from 'react-redux'
import { AddItemForm} from "../components/TodoList/AddItemForm";
import "../App.css";
import {TodoList, TodoListType} from "../components/TodoList/TodoList";
import {AppBar, Toolbar, IconButton, Typography, Button, Container, Grid,Paper} from '@material-ui/core'
import {Menu} from '@material-ui/icons'
import { addTodoListAC, changeTodoListFilterAC, changeTodoListTitleAC, removeTodoListAC } from "./todolist-reducer";
import {AppRootStateType} from '../state/store'


export type FilterValuesType = "all" | "active" | "completed";

export function AppWithRedux() {
  
  const dispatch = useDispatch();
  
  const todoLists = useSelector<AppRootStateType, Array<TodoListType>>( state => state.todoLists)

  function changeFilter(filter: FilterValuesType, todoListsID: string) {
    const action = changeTodoListFilterAC(filter, todoListsID)
    dispatch(action)
} 

  function removeTodoList (todoListsID: string) {
    const action = removeTodoListAC(todoListsID)
    dispatch(action) 
}

  const addTodoList = (title: string) => {
    const action = addTodoListAC(title)
    dispatch(action)
}

const changeTodoListTitle = (todoListsID: string, title: string) => {
    const action = changeTodoListTitleAC(todoListsID, title)
    dispatch(action)
}
  return (
    <div className="App">
      <AppBar position="static">
          <Toolbar>
            <IconButton edge="start"  color="inherit" aria-label="menu">
                <Menu />
                  </IconButton>
            <Typography variant="h6" >
                News
              </Typography>
                <Button color="inherit">Login</Button>
            </Toolbar>
        </AppBar>
          <Container fixed>
            <Grid container>
      <AddItemForm addItem={addTodoList} />
      </Grid>
      <Grid container spacing={4} >
      {
        todoLists.map(tl => {
        return (
        <Grid item >
          <Paper elevation={5} style={{padding: "15px"}}>
          
          <TodoList
         
            key={tl.id}
            id={tl.id}
            title={tl.title}
            filter={tl.filter}
            removeTodoList={removeTodoList}
            changeFilter={changeFilter}
            changeTodoListTitle={changeTodoListTitle}/>
          </Paper>
        </Grid>
        );
      })}
      </Grid>
    </Container>
    </div>
  );
}

