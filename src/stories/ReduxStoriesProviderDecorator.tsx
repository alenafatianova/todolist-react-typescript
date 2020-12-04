import React from 'react'
import {Provider} from 'react-redux'
import {AppRootStateType, store} from '../state/store'
import { tasksReducer } from '../state/tasks-reducer'
import { todoListReducer } from '../state/todolist-reducer'
import {combineReducers, createStore} from 'redux'
import { v1 } from 'uuid'

const rootReducer = combineReducers({
    tasks: tasksReducer,
    todoLists: todoListReducer,
})

const initialGlobalState = {
    todoLists: [
        { id: "todoListsID1", title: "What to buy", filter: "all" },
        { id: "todoListsID2" , title: "What to learn", filter: "active" },
    ],
    tasks: {
        ["todoListsID1"]: [
            {id: v1(), title: "JS", isDone: true },
            {id: v1(), title: "CSS", isDone: true }
        ],
        ["todoListsID2"]: [
            {id: v1(), title: "Milk", isDone: true },
            {id: v1(), title: "React Book", isDone: true }
        ],
    }
}
export const storyBookStore = createStore(rootReducer, initialGlobalState as AppRootStateType)

export const ReduxStoreProviderDecorator = (story: any) => {
    return <Provider store={storyBookStore}> {story()}</Provider>
}

