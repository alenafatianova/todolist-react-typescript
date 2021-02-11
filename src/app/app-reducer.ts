

import { Dispatch } from "redux"
import { loginAPI } from "../api/login-api"
import { setIsLoggedInAC } from "../features/auth-reducer"

const initialState: InitialStateType = {
    status: 'idle',
    error: null,
    isInitilized: false
}

export const appReducer = (state: InitialStateType = initialState, action: ActionsType): InitialStateType => {
    switch (action.type) {
        case 'APP/SET-STATUS':
            return {...state, status: action.status}
        case 'APP/SET-ERROR':
            return {...state, error: action.error}
        case 'APP/IS-INITILIZED': 
        return {...state, isInitilized: action.isInitilized}
        default:
            return {...state}
    }
}

export const initializeAppTC = () => (dispatch: Dispatch) => {
    loginAPI.me().then(res => {
        if (res.data.resultCode === 0) {
            dispatch(setIsLoggedInAC(true));
        } else {
        }  
    })
    .finally(() => {
        dispatch(isInitilizedAC(true))
    })
 }

export type RequestStatusType =  'idle' | 'loading' | 'succeeded' | 'failed'
export type InitialStateType = {
    // происходит ли сейчас взаимодействие с сервером
    status: RequestStatusType
    // если ошибка какая-то глобальная произойдёт - мы запишем текст ошибки сюда
    error: string | null
    isInitilized: boolean
}

export const setAppErrorAC = (error: string | null) => ({ type: 'APP/SET-ERROR', error } as const)
export const setAppStatusAC = (status:  RequestStatusType) => ({ type: 'APP/SET-STATUS', status } as const)
export const isInitilizedAC = (isInitilized: boolean) => ({type: 'APP/IS-INITILIZED', isInitilized} as const)

export type SetAppErrorActionType = ReturnType<typeof setAppErrorAC>
export type SetAppStatusActionType = ReturnType<typeof setAppStatusAC>
export type isInitilizedType = ReturnType <typeof isInitilizedAC>

type ActionsType =
    | SetAppErrorActionType
    | SetAppStatusActionType
    | isInitilizedType
