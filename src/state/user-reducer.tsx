import { error } from 'console'
import React from 'react'

export type StateType = {
    name: string
    age: number
    childrenCount: number
}

export type ActionType = {
    type: string  
    [key: string]: any       // 'INCREMENT_AGE' ||  'INCREMENT_CHILDREN_COUNT'
}

export const userReducer = (user: StateType, action: ActionType) => {
    switch (action.type) {
        case 'INCREMENT_AGE':                                 
        return {...user, age: user.age + 1};
        case 'INCREMENT_CHILDREN_COUNT':                                                                      
        return {...user, childrenCoun: user.childrenCount + 1};
        case 'CHANGE_NAME': 
            return {...user, name: action.name}
        default: 
           return user;
        
    }
    
}
// 1. Добавлять возраст
// 2. Добавлять количество детей