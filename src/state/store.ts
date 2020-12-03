import { todoListReducer } from './todolist-reducer';
import { tasksReducer } from './tasks-reducer';
import {combineReducers, createStore} from 'redux'

//---------задаем структуру нашего компонента-------
const rootReducer = combineReducers({
    tasks: tasksReducer,
    todoLists: todoListReducer
})

//----------создаем store-------------
export const store = createStore(rootReducer)

//---------определяем автоматом тип всего объекта----------------------------
export type AppRootStateType = ReturnType<typeof rootReducer>


//@ts-ignore
window.store = store;