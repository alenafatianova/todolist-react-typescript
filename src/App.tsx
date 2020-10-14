import React, { useState } from "react";
import { v1 } from "uuid";
import "./App.css";
import {
  TodoList,
  TaskType,
  TodoListType,
} from "./components/TodoList/TodoList";

export type FilterValuesType = "all" | "active" | "completed";

function App() {
  const setArray = useState<Array<TaskType>>([
    { id: v1(), title: "HTML", isDone: true },
    { id: v1(), title: "CSS", isDone: true },
    { id: v1(), title: "JS", isDone: false },
    { id: v1(), title: "Redux", isDone: false },
    { id: v1(), title: "Angular", isDone: true },
  ]);

  const tasks = setArray[0];
  const setTasks = setArray[1];

    const todoListsID1 = v1();
    const todoListsID2 = v1();
  const [todoLists, setTodoLists] = useState<Array<TodoListType>>([
    { id: v1(), title: "What to buy", filter: "all" },
    { id: v1(), title: "What to learn", filter: "all" },
  ]);
const [tasks, setTasks] = useState({
    [todoListsID1]: [
        
    ]
})


  function removeTask(taskID: string) {
    const filteredTasks = tasks.filter((task) => task.id !== taskID);
    setTasks(filteredTasks);
  }
  function addTask(newTaskTitle: string) {
    const newTask: TaskType = { id: v1(), title: newTaskTitle, isDone: false };
    setTasks([newTask, ...tasks]);
  }
  function changeFilter(value: FilterValuesType, todoListsID: string) {
    const todoList = todoLists.find(tl => tl.id === todoListsID)
    if(todoList) {
        todoList.filter = value
        setTodoLists([...todoLists])
    }
  };

  function changeStatus(taskID: string, isDone: boolean) {
    let newTasks = tasks.map((task) => {
      if (task.id === taskID) {
        return { ...task, isDone: isDone };
      }
      return task;
    });
    setTasks(newTasks);
  }

  return (
    <div className="App">
      
      {todoLists.map((tl) => {
        let tasksForTodoList = tasks;
        if (tl.filter === "active") {
          tasksForTodoList = tasks.filter((tasks) => tasks.isDone === false);
        }
        if (tl.filter === "completed") {
          tasksForTodoList = tasks.filter((tasks) => tasks.isDone === true);
        }
        return (
          <TodoList
            key={tl.id}
            id={tl.id}
            title={tl.title}
            tasks={tasksForTodoList}
            removeTask={removeTask}
            changeFilter={changeFilter}
            addTask={addTask}
            filter={tl.filter}
            changeStatus={changeStatus}
          />
        );
      })}
    </div>
  );
}

export default App;
