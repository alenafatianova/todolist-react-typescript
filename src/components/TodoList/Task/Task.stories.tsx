import React from 'react'
import { Meta, Story } from '@storybook/react/types-6-0'
import { Task } from './Task'
import {action} from '@storybook/addon-actions'


export default {
    title: 'Task Stories',
    component: Task,
} as Meta;

const removeTaskCallback = action('removes task from todoList')
const changeTaskTitleCallback = action('title changed')
const changeStatusCallback = action('status is changed')

export const TaskStories = () => {
    return <>
        <Task 
                    task={{id: '1', isDone: true, title: 'CSS'}} 
                    todoListID={'todoListID2'}
                    removeTask={removeTaskCallback}
                    changeTaskTitle={changeTaskTitleCallback}
                    changeStatus={changeStatusCallback}
        />
         <Task 
                    task={{id: '2', isDone: false, title: 'JS'}} 
                    todoListID={'todoListID1'}
                    removeTask={removeTaskCallback}
                    changeTaskTitle={changeTaskTitleCallback}
                    changeStatus={changeStatusCallback}
        />
    </> 
}