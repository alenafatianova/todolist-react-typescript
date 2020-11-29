import React, {useCallback} from "react";
import {useDispatch, useSelector} from 'react-redux'
import { AddItemForm} from "../components/TodoList/AddItemForm";
import "../App.css";
import {AppRootStateType} from './store'
import {TasksStateType, TodoList} from "../components/TodoList/TodoList";
import {AppBar, Toolbar, IconButton, Typography, Button, Container, Grid, Paper} from '@material-ui/core'
import {Menu} from '@material-ui/icons'
import { addTodoListAC, changeTodoListFilterAC, changeTodoListTitleAC, removeTodoListAC } from "./todolist-reducer";
import { addTaskAC, removeTaskAC, changeTaskStatusAC, changeTaskTitleAC } from "./tasks-reducer";

export type FilterValuesType = "all" | "active" | "completed";

export type TodoListType = {
  id: string
  title: string
  filter: FilterValuesType
}

export function AppWithRedux() {

  const dispatch = useDispatch();
  const todoLists = useSelector<AppRootStateType, Array<TodoListType>>(state => state.todoLists);
  const tasks = useSelector<AppRootStateType, TasksStateType>(state => state.tasks)


const removeTask = useCallback((taskID: string, todoListsID: string) => {
    const action = removeTaskAC(taskID, todoListsID)
    dispatch(action);
}, [dispatch, removeTaskAC])


const addTask = useCallback((newTaskTitle: string, todoListsID: string) => { 
    const action = addTaskAC(newTaskTitle, todoListsID)
    dispatch(action)
}, [dispatch, addTaskAC])

const changeFilter = useCallback((filter: FilterValuesType, todoListsID: string) => {
    const action = changeTodoListFilterAC(filter, todoListsID)
    dispatch(action)
}, [dispatch, changeTodoListFilterAC])


const changeStatus = useCallback((taskID: string, isDone: boolean, todoListsID: string) => {
    const action = changeTaskStatusAC(taskID, isDone, todoListsID)
    dispatch(action)
}, [dispatch, changeTaskStatusAC]) 


const changeTaskTitle = useCallback((taskID: string, editedTitle: string, todoListsID: string) => {
  const action = changeTaskTitleAC(taskID, editedTitle, todoListsID )
  dispatch(action)
}, [dispatch, changeTaskTitleAC])


  const removeTodoList = useCallback((todoListsID: string) => {
    const action = removeTodoListAC(todoListsID)
  dispatch(action)
}, [dispatch, removeTodoListAC])

  const addTodoList = useCallback((title: string) => {
    const action = addTodoListAC(title)
  dispatch(action)
}, [dispatch]) 


const changeTodoListTitle = useCallback((todoListsID: string, title: string) => {
    const action = changeTodoListTitleAC(todoListsID, title)
  dispatch(action)
}, [dispatch, changeTodoListTitleAC]) 

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
        let allTodoList = tasks[tl.id]
        let tasksForTodoList = allTodoList
        
        return (
        <Grid item key={tl.id}>
          <Paper elevation={5} style={{padding: "20px"}}>
          <TodoList
            key={tl.id}
            id={tl.id}
            title={tl.title}
            filter={tl.filter}
            tasks={tasksForTodoList}
            addTask={addTask}
            removeTask={removeTask}
            removeTodoList={removeTodoList}
            changeFilter={changeFilter}
            changeStatus={changeStatus}
            changeTaskTitle={changeTaskTitle}
            changeTodoListTitle={changeTodoListTitle}
          />
          </Paper>
        </Grid>
        );
      })
      }
      </Grid>
    </Container>
    </div>
  );
}
export default AppWithRedux;
