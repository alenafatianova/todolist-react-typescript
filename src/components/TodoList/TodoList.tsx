import React, {ChangeEvent, KeyboardEvent, useState} from 'react'
import { AddItemForm } from '../../AddItemForm';
import { FilterValuesType } from '../../App';
import { EditableSpan } from '../../EditableSpan';


export type TaskType = {
    id: string
    title: string
    isDone: boolean
};
export type TasksStateType = {
    [key: string]: Array<TaskType>
};
export type TodoListType = {
    id: string
    title: string
    filter: FilterValuesType
}
type PropsType = {
    id: string
    title: string
    tasks: Array<TaskType>
    filter: FilterValuesType
    removeTask: (taskID: string, todoListsID: string) => void
    removeTodoList: (todoListsID: string) => void
    changeFilter: (value: FilterValuesType, todoListsID: string) => void
    addTask: (newTaskTitle: string, todoListsID: string) => void
    changeStatus: (taskID: string, isDone: boolean, todoListsID: string) => void
    changeTaskTitle: (taskID: string, editedTitle: string, todoListsID: string) => void
    changeTodoListTitle: (todoListsID: string, title: string) => void
};

export function TodoList(props: PropsType) {
        
    let tasks = props.tasks.map(task => {
    const changeStatus = (e: ChangeEvent<HTMLInputElement>) => {props.changeStatus(task.id, e.currentTarget.checked, props.id)}
    const changeTitle = (editedTitle: string) => {props.changeTaskTitle(task.id, editedTitle, props.id)}
        return (
            <li key={task.id} className={task.isDone ? 'isDone' : ''}>
            <input type="checkbox" checked={task.isDone}
                onChange={changeStatus}/>
            <EditableSpan title={task.title} changeTaskTitle={changeTitle} />
            <button onClick={ () => {props.removeTask(task.id, props.id)} }>x</button>
        </li>      
        )
    });
    
    const removeTodoList = () => {props.removeTodoList(props.id)}
    const onSetAllFilterClick = () => {props.changeFilter('all', props.id)}
    const onSetActiveFilterClick = () => {props.changeFilter('active', props.id)}
    const onSetCompletedFilterClick = () => {props.changeFilter('completed', props.id)}
    const addTask = (title: string) => {
        props.addTask(title, props.id)
    }
    const changeTodoListTitle = (title: string) => {props.changeTodoListTitle(props.id, title)}
    return (      
        <div>
         <h3>
         <EditableSpan title={props.title} changeTaskTitle={changeTodoListTitle} />
         <button onClick={removeTodoList} >X</button>
         </h3> 
        <AddItemForm addItem={addTask}/>
        <ul>
            { tasks }
        </ul>
        <div>
            <button 
            className={props.filter === 'all' ? 'active' : ''}
            onClick={onSetAllFilterClick}>All</button>
            <button 
            className={props.filter === 'active' ? 'active' : ''}
            onClick={onSetActiveFilterClick}>Active</button>
            <button 
            className={props.filter === 'completed' ? 'active' : ''}
            onClick={onSetCompletedFilterClick}>Completed</button>
        </div>
    </div>
    )
}

export default TodoList;