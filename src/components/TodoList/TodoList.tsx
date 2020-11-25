import React, {ChangeEvent, useCallback} from 'react'
import {AddItemForm } from './AddItemForm';
import {FilterValuesType } from '../../App';
import {EditableSpan } from './EditableSpan';
import {Button, IconButton, Checkbox} from '@material-ui/core'
import {Delete} from '@material-ui/icons'

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
            <Checkbox 
                checked={task.isDone}
                onChange={changeStatus}
                color={'primary'}
                />
            <EditableSpan title={task.title} changeTaskTitle={changeTitle} />
            <Button  onClick={() => {props.removeTask(task.id, props.id)}}><Delete>X</Delete></Button>
        </li> 

        )
    });
    
    const removeTodoList = () => {props.removeTodoList(props.id)}
    const onSetAllFilterClick = () => {props.changeFilter("all", props.id)}
    const onSetActiveFilterClick = () => {props.changeFilter("active", props.id)}
    const onSetCompletedFilterClick = () => { props.changeFilter('completed', props.id)}
    
    const addTask = useCallback((title: string) => {
        props.addTask(title, props.id)
    }, [props])
    
    const changeTodoListTitle = useCallback((title: string) => {
        props.changeTodoListTitle(props.id, title)
    }, [props])
    
    return (      
        <div>
        <h3>
        <EditableSpan title={props.title} changeTaskTitle={changeTodoListTitle} />
        <IconButton  onClick={removeTodoList}><Delete>X</Delete></IconButton>
        </h3> 
        <AddItemForm addItem={addTask}/>
        <ul style={{listStyle: "none"}}>{ tasks }</ul>
        <div>
            <Button 
                size={'small'}
                variant={'outlined'}
                color={props.filter === "all" ? "primary" : "secondary"}
                onClick={onSetAllFilterClick}>
                    All
            </Button>
            <Button 
                size={'small'}
                variant={'outlined'}
                color={props.filter === "active" ? "primary" : "secondary"}
                onClick={onSetActiveFilterClick}>
                    Active
            </Button>
            <Button 
                size={'small'}
                variant={'outlined'}
                color={props.filter === 'completed' ? 'primary' : 'secondary'}
                onClick={onSetCompletedFilterClick}>
                    Completed
            </Button>
        </div>
    </div>
    )
}

export default TodoList;