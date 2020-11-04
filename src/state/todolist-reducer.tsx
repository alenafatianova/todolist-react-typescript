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


//----------Actions Type And Actions Creators ----------
export type ActionType = ChangeTodolistFilterActionType | 
    ChangeTodolistTitleActionType | 
    AddTodolistActionType | 
    RemoveTodolistActionType

export const RemoveTodolistAC = (todolistID: string): RemoveTodolistActionType => {
    return {type: 'REMOVE_TODOLIST', id: todolistID}
}
export const AddTodolistAC = (title: string): AddTodolistActionType => {
    return {type: 'ADD_TODOLIST', title: title}
}
export const ChangeTodolistTitleAC = (id: string, title: string): ChangeTodolistTitleActionType => {
    return {type: 'CHANGE_TODOLIST_TITLE', id: id, title: title}
}
export const ChangeTodoListFilterAC = (filter: FilterValuesType, todolistID: string): ChangeTodolistFilterActionType => {
    return {type: 'CHANGE_TODOLIST_FILTER', filter: filter, id: todolistID}
}

//-------------------------Todo List Reducer Fn-------------------------------------
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
            const newTodoListTitle = state.find(tl => tl.id === action.id)
            if (newTodoListTitle) {
                newTodoListTitle.title = action.title
            }
            return [...state]
       
        case 'CHANGE_TODOLIST_FILTER' : 
            const newTodoListFilter = state.find(tl => tl.id === action.id)
            if (newTodoListFilter) {
                newTodoListFilter.filter = action.filter
            }
            return [...state]
        
       default:
            throw new Error('error')
    }

} 