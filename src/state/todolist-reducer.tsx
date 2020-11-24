import { TodoListType } from "../components/TodoList/TodoList";
import {v1} from 'uuid'
import {FilterValuesType} from '../App'

export type RemoveTodoListActionType = {
    type: "REMOVE_TODOLIST"
    id: string
}
export type AddTodoListActionType = {
    type: "ADD_TODOLIST",
    title: string
    todoListId: string
}
export type ChangeTodoListTitleActionType = {
    type: "CHANGE_TODOLIST_TITLE",
    title: string
    id: string
}
export type ChangeTodoListFilterActionType = {
    type: "CHANGE_TODOLIST_FILTER",
    filter: FilterValuesType
    id: string
}

//----------Actions Type And Actions Creators ----------
export type ActionType = 
    ChangeTodoListFilterActionType | 
    ChangeTodoListTitleActionType | 
    AddTodoListActionType | 
    RemoveTodoListActionType

export const removeTodoListAC = (id: string): RemoveTodoListActionType => {
    return {type: 'REMOVE_TODOLIST', id: id}
}
export const addTodoListAC = (title: string): AddTodoListActionType => {
    return {type: 'ADD_TODOLIST', title, todoListId: v1() }
}
export const changeTodoListTitleAC = (id: string, title: string): ChangeTodoListTitleActionType => {
    return {type: 'CHANGE_TODOLIST_TITLE', id: id, title: title}
}
export const changeTodoListFilterAC = (filter: FilterValuesType, todolistId: string): ChangeTodoListFilterActionType => {
    return {type: 'CHANGE_TODOLIST_FILTER', filter: filter, id: todolistId}
}

export const todoListsID1 = v1();
export const todoListsID2 = v1();

const initialState: Array<TodoListType> = []

//-------------------------Todo List Reducer Fn-------------------------------------
export const todoListReducer = (state: Array<TodoListType> = initialState, action: ActionType) => {
    switch (action.type) {
        case 'REMOVE_TODOLIST' : 
        return state.filter(tl => tl.id !== action.id);
        
        case 'ADD_TODOLIST' : {
            const newTodoList: TodoListType = {
                id: action.todoListId,
                title: action.title,
                filter: "all"
            }
            return [...state, newTodoList]
        }
        case 'CHANGE_TODOLIST_TITLE' : {
            const newTodoListTitle = state.find(tl => tl.id === action.id)
            if (newTodoListTitle) {
                newTodoListTitle.title = action.title
            }
            return [...state]
        }
        case 'CHANGE_TODOLIST_FILTER' : {
            const newTodoListFilter = state.find(tl => tl.id === action.id)
            if (newTodoListFilter) {
                newTodoListFilter.filter = action.filter
            }
            return [...state]
        }
       default:
            return state;
    }

} 