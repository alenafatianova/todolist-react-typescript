import React, { useState } from "react";
import { v1 } from "uuid";
import { AddItemForm} from "./components/TodoList/AddItemForm";
import "./App.css";
import {
  TodoList,
  TaskType,
  TodoListType, TasksStateType
} from "./components/TodoList/TodoList";
import {AppBar, 
  Toolbar, 
  IconButton, 
  Typography, 
  Button, 
  Container, 
  Grid,
  Paper} from '@material-ui/core'
import {Menu} from '@material-ui/icons'

export type FilterValuesType = "all" | "active" | "completed";

function App() {
 
  const todoListsID1 = v1();
  const todoListsID2 = v1();

  const [todoLists, setTodoLists] = useState<Array<TodoListType>>([
    { id: todoListsID1, title: "What to buy", filter: "all" },
    { id: todoListsID2 , title: "What to learn", filter: "active" },
  ]);
  
  const [tasks, setTasks] = useState<TasksStateType>({
    [todoListsID1] : [
      { id: v1(), title: "HTML", isDone: true },
      { id: v1(), title: "CSS", isDone: true },
      { id: v1(), title: "JS", isDone: false },
      { id: v1(), title: "Redux", isDone: false },
      { id: v1(), title: "Angular", isDone: true }
    ], 
    [todoListsID2] : [
      { id: v1(), title: "milk", isDone: false },
      { id: v1(), title: "cat's food", isDone: true },
      { id: v1(), title: "tea/coffee", isDone: false },
      { id: v1(), title: "fruits", isDone: true },
      { id: v1(), title: "cheese", isDone: false },
    ]
  });

//-----------delete task from Todo List--------
function removeTask(taskID: string, todoListsID: string) {
    const todoList = tasks[todoListsID]
    tasks[todoListsID] = todoList.filter(t => t.id !== taskID)
    setTasks({...tasks})
  }

//----------adding new task to Todo List
function addTask(newTaskTitle: string, todoListsID: string) {
    const newTask: TaskType = { id: v1(), title: newTaskTitle, isDone: false };
    const todoList = tasks[todoListsID]
    tasks[todoListsID]= [newTask, ...todoList]
    setTasks({...tasks})
  }

//-------------Change Filter in Todo List---------------------
  function changeFilter(value: FilterValuesType, todoListsID: string) {
    const todoList = todoLists.find((tl) => tl.id === todoListsID);
    if (todoList) {
      todoList.filter = value;
      setTodoLists([...todoLists]);
    }
  }

  //-------------Change Status in Todo List-----------------
function changeStatus(taskID: string, isDone: boolean, todoListsID: string) {
    const todoList = tasks[todoListsID]
    let newTodoList = todoList.map((task) => {
      if (task.id === taskID) {
        return { ...task, isDone: isDone };
      }
      return task;
    });
    tasks[todoListsID] = newTodoList
    setTasks({...tasks}) 
  }


  //---------------change Task Title------------------
function changeTaskTitle(taskID: string, editedTitle: string, todoListsID: string) {
    const todoList = tasks[todoListsID]
    let newTodoList = todoList.map((task) => {
      if (task.id === taskID) {
        return { ...task, title: editedTitle };
      }
      return task;
    });
    tasks[todoListsID] = newTodoList
    setTasks({...tasks}) 
  }

  
//---------remove Todo List-----------------
  function removeTodoList (todoListsID: string) {
    let todoList = todoLists.filter(tl => tl.id !== todoListsID)
    setTodoLists(todoList)
  }


//------------Add New Todo List --------------
  const addTodoList = (title: string) => {
    const newTodoListID = v1()
    const newTodoList: TodoListType = {
      id: newTodoListID,
      title: title,
      filter: "all"
    }
    setTodoLists([newTodoList, ...todoLists])
    setTasks({...tasks,[newTodoListID]: []})
}


//-----------Change Title in Todo List-----------------------------
const changeTodoListTitle = (todoListsID: string, title: string) => {
  const todoList = todoLists.find(tl => tl.id === todoListsID)
  if(todoList) {
    todoList.title = title
    setTodoLists([...todoLists])
  }
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

export default App;
