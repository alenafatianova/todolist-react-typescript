import React, {ChangeEvent, KeyboardEvent, useState} from 'react'
import { FilterValuesType } from '../../App';


export type TaskType = {
    id: string
    title: string
    isDone: boolean
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
    removeTask: (taskID: string) => void
    changeFilter: (value: FilterValuesType, todoListID: string) => void
    addTask: (newTaskTitle: string) => void
    changeStatus: (taskID: string, isDone: boolean) => void
};

export function TodoList(props: PropsType) {

    const [title, setTitle] = useState <string>('')
    let [error, setError] = useState <string | null>() 
    
    const addTask = () =>  {
        if(title.trim()) {
            props.addTask(title.trim()) 
            setTitle('')
        } else {
            setError('Title is required!')
        }
        
    }
        
    let tasks = props.tasks.map(task => {
        const removeTask = () => {props.removeTask(task.id)}
        const changeStatus = (e: ChangeEvent<HTMLInputElement>) => {
            props.changeStatus(task.id, e.currentTarget.checked)
        }
        return (
            <li key={task.id} className={task.isDone ? 'isDone' : ''}>
            <input type="checkbox" checked={task.isDone}
                onChange={changeStatus}/>
            <span>{task.title}</span>
            <button onClick={ () => {props.removeTask(task.id)} }>x</button>
        </li>      
        )
    });
    
    return (      
        <div>
        <h3>{props.title}</h3>
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
            onClick={() => {props.changeFilter('all')}}>All</button>
            <button 
            className={props.filter === 'active' ? 'active' : ''}
            onClick={() => {props.changeFilter('active')}}>Active</button>
            <button 
            className={props.filter === 'completed' ? 'active' : ''}
            onClick={() => {props.changeFilter('completed')}}>Completed</button>
        </div>
    </div>
    )
}

export default TodoList;