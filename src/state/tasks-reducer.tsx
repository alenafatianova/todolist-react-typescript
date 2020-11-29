import { TasksStateType, TaskType } from "../components/TodoList/TodoList";
import {v1} from 'uuid'
import {AddTodoListActionType, RemoveTodoListActionType} from './todolist-reducer'


export type RemoveTasklistActionType = {
    type: "REMOVE-TASK"
    todoListID: string
    taskID: string
}
export type ChangeTaskStatusActionType = {
    type: "CHANGE-TASK-STATUS"
    taskID: string
    status: boolean
    todoListID: string
}
export type AddTaskActionType = {
    type: "ADD-TASK"
    newTaskTitle: string
    todoListID: string
}
export type ChangeTaskTitleActionType = {
    type: "CHANGE-TASK-TITLE"
    newTitle: string
    taskID: string
    todoListID: string
}

export type ActionType = RemoveTasklistActionType | ChangeTaskStatusActionType | 
    AddTaskActionType | ChangeTaskTitleActionType | AddTodoListActionType |
    RemoveTodoListActionType

const initialTaskType: TasksStateType = {}


export const tasksReducer = (state: TasksStateType = initialTaskType, action: ActionType): TasksStateType => {
    
    switch (action.type) {
        
        case 'REMOVE-TASK' : {
        let stateCopy = {...state}
        let todoListTasks = stateCopy[action.todoListID]
            stateCopy[action.todoListID] = todoListTasks.filter(t => t.id !== action.taskID)
        return stateCopy
        }
        case 'CHANGE-TASK-STATUS':  {
            const stateCopy = {...state}
            const tasks = stateCopy[action.todoListID]
            const tasksCopy = tasks.map(t => {
                if (t.id === action.taskID) {
                    return {
                        ...t, isDone: action.status
                    }
                } else {
                    return t
                }
            })
            stateCopy[action.todoListID] = tasksCopy
            
            return stateCopy
        }
        case 'CHANGE-TASK-TITLE': {
            const stateCopy = {...state}
            const tasks = stateCopy[action.todoListID]
            const task = tasks.find(t => t.id === action.taskID)
               if (task) {
                    task.title = action.newTitle
               }
            return stateCopy
        }
        case 'ADD-TASK': {
            const stateCopy = {...state}
            const newTask: TaskType =  {id: v1(), title: action.newTaskTitle, isDone: false}
            const tasks = stateCopy[action.todoListID]
            stateCopy[action.todoListID] = [newTask, ...tasks] 
            return stateCopy;
        }
        case 'ADD_TODOLIST': {
            const stateCopy = {...state}
            stateCopy[action.todoListID] = []
            return stateCopy
        }
        case 'REMOVE_TODOLIST': {
            const stateCopy = {...state}
            delete stateCopy[action.id]  
            
            return stateCopy
        }
       default:
            return state;
    }
} 
export const removeTaskAC = (taskID: string, todoListID: string): RemoveTasklistActionType => {
    return {type: 'REMOVE-TASK', taskID,  todoListID} as const
}
export const changeTaskStatusAC = (taskID: string, status: boolean, todoListID: string): ChangeTaskStatusActionType => {
    return {type: 'CHANGE-TASK-STATUS', taskID, status, todoListID} as const
}
export const addTaskAC = (newTaskTitle: string, todoListID: string): AddTaskActionType => {
    return {type: 'ADD-TASK', newTaskTitle, todoListID} as const
}
export const changeTaskTitleAC = (taskID: string, newTitle: string, todoListID: string): ChangeTaskTitleActionType => {
    return {type: 'CHANGE-TASK-TITLE', taskID, newTitle, todoListID}
}

