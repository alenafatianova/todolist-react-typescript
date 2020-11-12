import { TasksStateType } from "../components/TodoList/TodoList";


export type RemoveTodolistActionType = {
    type: "REMOVE-TASK"
    todoListId: string
    taskId: string
}
export type ChangeTaskTitleActionType = {
    type: "CHANGE-TASK-TITLE"
    taskId: string
    status: boolean
    todoListId: string
}

export type ActionType = RemoveTodolistActionType | ChangeTaskTitleActionType | AddTaskActionType

export const tasksReducer = (state: TasksStateType, action: ActionType) => {
    switch (action.type) {
        
        case 'REMOVE-TASK' : {
        let stateCopy = {...state}
            stateCopy[action.todoListId] = state[action.todoListId].filter(t => t.id !== action.taskId)
        return stateCopy
        }
       
        case 'CHANGE-TASK-TITLE':  {
            const stateCopy = {...state}
            const tasks = state[action.todoListId]
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
        case 'ADD-TASK': {

        }
       default:
            throw new Error('error')
    }
} 
export const removeTaskAC = (taskId: string, todoListId: string) => {
    return {type: 'REMOVE-TASK', taskId,  todoListId} as const
}

export const changeTaskStatusAC = (taskId: string, status: boolean, todoListId: string) => {
    return {type: 'CHANGE-TASK-TITLE', taskId, status, todoListId} as const
}
