
import { TodoListType } from "../components/TodoList/TodoList";
import {v1} from 'uuid'
import {FilterValuesType} from '../App'

export type RemoveTodolistActionType = {
    type: "REMOVE_TODOLIST",
    id: string
}
export type AddTodolistActionType = {
    type: "ADD_TODOLIST",
    title: string
}
export type ChangeTodolistTitleActionType = {
    type: "CHANGE_TODOLIST_TITLE",
    title: string
    id: string
}
export type ChangeTodolistFilterActionType = {
    type: "CHANGE_TODOLIST_FILTER",
    filter: FilterValuesType
    id: string
}


export type ActionType = ChangeTodolistFilterActionType | 
    ChangeTodolistTitleActionType | 
    AddTodolistActionType | 
    RemoveTodolistActionType

export const todoListReducer = (state: Array<TodoListType>, action: ActionType) => {
    switch (action.type) {
        case 'REMOVE_TODOLIST' : 
            return state.filter(tl => tl.id !== action.id);
        case 'ADD_TODOLIST' :
            const newTodoList: TodoListType = {
                id: v1(),
                title: action.title,
                filter: "all"
            }
            return [...state, newTodoList]
        case 'CHANGE_TODOLIST_TITLE' :
            const todoList = state.find(tl => tl.id === action.id)
            if (todoList) {
                todoList.title = action.title
                return [...state]
            } 
            return state
        case 'CHANGE_TODOLIST_FILTER' :
           
        default:
            throw new Error('error')
    }

} 