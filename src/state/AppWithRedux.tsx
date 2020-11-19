import React, { useReducer } from "react";
import { v1 } from "uuid";
import { AddItemForm} from "../components/TodoList/AddItemForm";
import "../App.css";
import {TodoList} from "../components/TodoList/TodoList";
import {AppBar, 
  Toolbar, 
  IconButton, 
  Typography, 
  Button, 
  Container, 
  Grid,
  Paper} from '@material-ui/core'
import {Menu} from '@material-ui/icons'
import { addTodoListAC, changeTodoListFilterAC, changeTodoListTitleAC, removeTodoListAC, todoListReducer } from "./todolist-reducer";
import { addTaskAC, removeTaskAC, tasksReducer, changeTaskStatusAC, changeTaskTitleAC } from "./tasks-reducer";

export type FilterValuesType = "all" | "active" | "completed";

export function AppWithRedux() {
 
  const todoListsID1 = v1();
  const todoListsID2 = v1();

  const [todoLists, dispatchToTodoList] = useReducer(todoListReducer, [
      { id: todoListsID1, title: "What to buy", filter: "all" },
    { id: todoListsID2 , title: "What to learn", filter: "active" }
])
  
  const [tasks, dispatchToTasks] = useReducer(tasksReducer, {
    [todoListsID1]: [
        { id: v1(), title: "HTML", isDone: true },
        { id: v1(), title: "CSS", isDone: true },
        { id: v1(), title: "JS", isDone: false },
        { id: v1(), title: "Redux", isDone: false },
        { id: v1(), title: "Angular", isDone: true }
      ], 
      [todoListsID2]: [
        { id: v1(), title: "milk", isDone: false },
        { id: v1(), title: "cat's food", isDone: true },
        { id: v1(), title: "tea/coffee", isDone: false },
        { id: v1(), title: "fruits", isDone: true },
        { id: v1(), title: "cheese", isDone: false },
      ]
  });
//-----------delete task from Todo List--------
function removeTask(taskID: string, todoListsID: string) {
    const action = removeTaskAC(taskID, todoListsID)
    dispatchToTasks(action);
}
//----------adding new task to Todo List----------------------
function addTask(newTaskTitle: string, todoListsID: string) {
  const action = addTaskAC(newTaskTitle, todoListsID)
  dispatchToTasks(action)
}
//-------------Change Filter in Todo List---------------------
  function changeFilter(filter: FilterValuesType, todoListsID: string) {
    const action = changeTodoListFilterAC(filter, todoListsID)
    dispatchToTodoList(action)
  }
//-------------Change Status in Todo List-----------------
function changeStatus(taskID: string, isDone: boolean, todoListsID: string) {
    const action = changeTaskStatusAC(taskID, isDone, todoListsID)
    dispatchToTasks(action)
}
//---------------change Task Title------------------
function changeTaskTitle(taskID: string, editedTitle: string, todoListsID: string) {
  const action = changeTaskTitleAC(taskID, editedTitle, todoListsID )
  dispatchToTasks(action)
}
//---------remove Todo List---------------
  function removeTodoList (todoListsID: string) {
    const action = removeTodoListAC(todoListsID)
    dispatchToTasks(action)
}
//------------Add New Todo List --------------
  const addTodoList = (title: string) => {
    const action = addTodoListAC(title)
    dispatchToTodoList(action)
}
//-----------Change Title in Todo List-----------------------------
const changeTodoListTitle = (todoListsID: string, title: string) => {
    const action = changeTodoListTitleAC(todoListsID, title)
    dispatchToTodoList(action)
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
        let tasksForTodoList = tasks[tl.id];
        if (tl.filter === "active") {
          tasksForTodoList = tasks[tl.id].filter((tasks) => tasks.isDone === false);
        }
        if (tl.filter === "completed") {
          tasksForTodoList = tasks[tl.id].filter((tasks) => tasks.isDone === true);
        }
        return (
        <Grid item >
          <Paper elevation={5} style={{padding: "15px"}}>
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
      })}
      </Grid>
    </Container>
    </div>
  );
}

