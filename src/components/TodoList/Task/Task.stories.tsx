import React from 'react'
import { Meta, Story } from '@storybook/react/types-6-0'
import { Task, PropsTaskType } from './Task'
import { action } from '@storybook/addon-actions'


export default {
    title: 'Task Stories',
    component: Task,
    argTypes: {},
} as Meta;

const Template: Story<PropsTaskType> = (args) => <Task {...args}/>

const removeTaskCallback = action('Remove task')
const changeStatusCallback = action('Status changed inside the task')
const changeTitleCallback = action('Title is changed inside the task')

export const TaskIsDoneExample  = Template.bind({});
TaskIsDoneExample.args = {
    task: {id: '1', isDone: false, title: 'CSS'},
    todoListID: 'todoListID1',
    removeTask: removeTaskCallback,
    changeTaskTitle: changeTitleCallback,
    changeStatus: changeStatusCallback,
}
export const TaskIsNotDoneExample  = Template.bind({});
TaskIsNotDoneExample.args = {
    task: {id: '1', isDone: true, title: 'JS'},
    todoListID: 'todoListID2',
    removeTask: removeTaskCallback,
    changeTaskTitle: changeTitleCallback,
    changeStatus: changeStatusCallback,
}
       