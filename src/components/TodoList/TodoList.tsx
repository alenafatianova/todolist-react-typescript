import React, {ChangeEvent, KeyboardEvent, useState} from 'react'
import { FilterValuesType } from '../../App';


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
};

export function TodoList(props: PropsType) {

    const [title, setTitle] = useState <string>('')
    let [error, setError] = useState <string | null>() 
    
    const addTask = () =>  {
        if(title.trim()) {
            props.addTask(title.trim(), props.id) 
            setTitle('')
        } else {
            setError('Title is required!')
        }
        
    }
        
    let tasks = props.tasks.map(task => {
        const removeTask = () => {props.removeTask(task.id, props.id)}
        const changeStatus = (e: ChangeEvent<HTMLInputElement>) => {
            props.changeStatus(task.id, e.currentTarget.checked, props.id)
        }
        return (
            <li key={task.id} className={task.isDone ? 'isDone' : ''}>
            <input type="checkbox" checked={task.isDone}
                onChange={changeStatus}/>
            <span>{task.title}</span>
            <button onClick={ () => {props.removeTask(task.id, props.id)} }>x</button>
        </li>      
        )
    });
    
    const removeTodoList = () => {props.removeTodoList(props.id)}



    return (      
        <div>
        <h3>{props.title} <button onClick={removeTodoList} >X</button></h3>
        <div>
            <input 
                value={title} 
                onChange={ (e: ChangeEvent <HTMLInputElement>) => {setTitle(e.currentTarget.value) }}
                onKeyPress={ (e: KeyboardEvent <HTMLInputElement>) => {
                    setError(null);
                    if (e.key === 'Enter') {addTask()} }}
                className={error ? 'error': ''} 
            />
            <button onClick={addTask}>+</button>
            { error && <div className={'error-message'}>{error}</div>}
        </div>
        <ul>
            { tasks }
        </ul>
        <div>
            <button 
            className={props.filter === 'all' ? 'active' : ''}
            onClick={() => {props.changeFilter('all', props.id)}}>All</button>
            <button 
            className={props.filter === 'active' ? 'active' : ''}
            onClick={() => {props.changeFilter('active', props.id)}}>Active</button>
            <button 
            className={props.filter === 'completed' ? 'active' : ''}
            onClick={() => {props.changeFilter('completed', props.id)}}>Completed</button>
        </div>
    </div>
    )
}

export default TodoList;