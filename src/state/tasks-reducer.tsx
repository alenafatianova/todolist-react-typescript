import { TasksStateType, TaskType } from "../components/TodoList/TodoList";
import {v1} from 'uuid'
import {AddTodoListActionType, RemoveTodoListActionType} from './todolist-reducer'

export type RemoveTasklistActionType = {
    type: "REMOVE-TASK"
    todoListId: string
    taskId: string
}
export type ChangeTaskStatusActionType = {
    type: "CHANGE-TASK-STATUS"
    taskId: string
    status: boolean
    todoListId: string
}
export type AddTaskActionType = {
    type: "ADD-TASK"
    newTaskTitle: string
    todoListId: string
}
export type ChangeTaskTitleActionType = {
    type: "CHANGE-TASK-TITLE"
    newTitle: string
    taskId: string
    todoListId: string
}

export type ActionType = RemoveTasklistActionType |     
    ChangeTaskStatusActionType | 
    AddTaskActionType | 
    ChangeTaskTitleActionType | 
    AddTodoListActionType |
    RemoveTodoListActionType


const initialState: TasksStateType = {}
export const tasksReducer = (state: TasksStateType = initialState, action: ActionType): TasksStateType => {
    switch (action.type) {
        
        case 'REMOVE-TASK' : {
        let stateCopy = {...state}
            stateCopy[action.todoListId] = state[action.todoListId].filter(t => t.id !== action.taskId)
        return stateCopy
        }
        case 'CHANGE-TASK-STATUS':  {
            const stateCopy = {...state}
            const tasks = stateCopy[action.todoListId]
            const tasksCopy = tasks.map(t => {
                if (t.id === action.taskId) {
                    return {
                        ...t, isDone: action.status
                    }
                } else {
                    return t
                }
            })
            stateCopy[action.todoListId] = tasksCopy
            
            return stateCopy
        }
        case 'CHANGE-TASK-TITLE': {
            const stateCopy = {...state}
            const tasks = stateCopy[action.todoListId]
            const task = tasks.find(t => t.id === action.taskId)
               if (task) {
                    task.title = action.newTitle
               }
             
            return stateCopy
        }
        case 'ADD-TASK': {
            const stateCopy = {...state}
            const tasks = stateCopy[action.todoListId]
            const newTask: TaskType =  {id: v1(), title: action.newTaskTitle, isDone: false}
            const newTasks = [newTask, ...tasks] 
            stateCopy[action.todoListId] = newTasks
            return stateCopy;
        }
        case 'ADD_TODOLIST': {
            const stateCopy = {...state}
            stateCopy[action.todoListId] = []
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
export const removeTaskAC = (taskId: string, todoListId: string): RemoveTasklistActionType => {
    return {type: 'REMOVE-TASK', taskId,  todoListId} as const
}

export const changeTaskStatusAC = (taskId: string, status: boolean, todoListId: string): ChangeTaskStatusActionType => {
    return {type: 'CHANGE-TASK-STATUS', taskId, status, todoListId} as const
}
export const addTaskAC = (newTaskTitle: string, todoListId: string): AddTaskActionType => {
    return {type: 'ADD-TASK', newTaskTitle, todoListId} as const
}
export const changeTaskTitleAC = (taskId: string, newTitle: string, todoListId: string): ChangeTaskTitleActionType => {
    return {type: 'CHANGE-TASK-TITLE', taskId, newTitle, todoListId}
}