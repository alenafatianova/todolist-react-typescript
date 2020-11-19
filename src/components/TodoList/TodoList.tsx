import React, {ChangeEvent} from 'react'
import {AddItemForm } from './AddItemForm';
import {FilterValuesType } from '../../state/AppWithRedux';
import {EditableSpan } from './EditableSpan';
import {Button, IconButton, Checkbox} from '@material-ui/core'
import {Delete} from '@material-ui/icons'
import {useDispatch, useSelector} from 'react-redux'
import {AppRootStateType} from '../../state/store'
import {addTaskAC, removeTaskAC, changeTaskTitleAC, changeTaskStatusAC} from '../../state/tasks-reducer'

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
export type PropsType = {
    id: string
    title: string
    filter: FilterValuesType
    removeTodoList: (todoListsID: string) => void
    changeFilter: (value: FilterValuesType, todoListsID: string) => void
    changeTodoListTitle: (todoListsID: string, title: string) => void
};

export function TodoList(props: PropsType) {

    let tasks = useSelector<AppRootStateType, Array<TaskType>>(state => state.tasks[props.id])
    
    const dispatch = useDispatch();
    
    let allTodoListTasks = tasks;
    let tasksForTodoList = allTodoListTasks;

    tasksForTodoList.map(task => {
        const changeStatus = (e: ChangeEvent<HTMLInputElement>) => {
            dispatch(changeTaskStatusAC(task.id, e.currentTarget.checked, props.id))
        }
    
    const changeTitle = (editedTitle: string) => {
        dispatch(changeTaskTitleAC(task.id, editedTitle, props.id))
        return (
            <li key={task.id} className={task.isDone ? 'isDone' : ''}>
            <Checkbox 
                checked={task.isDone}
                onChange={changeStatus}
                color={'primary'}
                />
            <EditableSpan title={task.title} changeTaskTitle={changeTitle} />
            <Button  
                onClick={() => {dispatch(removeTaskAC(task.id, props.id))}}><Delete>X</Delete></Button>
        </li> 
        )
    };
    
    const removeTodoList = () => {props.removeTodoList(props.id)}
    const onSetAllFilterClick = () => {props.changeFilter("all", props.id)}
    const onSetActiveFilterClick = () => {props.changeFilter("active", props.id)}
    const onSetCompletedFilterClick = () => { props.changeFilter('completed', props.id)}
    
    const changeTodoListTitle = (title: string) => {props.changeTodoListTitle(props.id, title)}
    
    
    if (props.filter === "active") {
        tasksForTodoList = allTodoListTasks.filter(tasks => tasks.isDone === false);
    }
      if (props.filter === "completed") {
        tasksForTodoList = allTodoListTasks.filter(tasks => tasks.isDone === true);
    }

    return (      
        <div>
        <h3>
        <EditableSpan title={props.title} changeTaskTitle={changeTodoListTitle} />
        <IconButton  onClick={removeTodoList}><Delete>X</Delete></IconButton>
        </h3> 
        <AddItemForm addItem={(title) => {dispatch(addTaskAC(title, props.id))}}/>
        <ul style={{listStyle: "none"}}>{ tasks }</ul>
        <div>
            <Button 
                size={'small'}
                variant={'outlined'}
                color={props.filter === "all" ? "primary" : "secondary"}
                onClick={onSetAllFilterClick}>All</Button>
            <Button 
                size={'small'}
                variant={'outlined'}
                color={props.filter === "active" ? "primary" : "secondary"}
                onClick={onSetActiveFilterClick}>Active</Button>
            <Button 
                size={'small'}
                variant={'outlined'}
                color={props.filter === 'completed' ? 'primary' : 'secondary'}
                onClick={onSetCompletedFilterClick}>Completed</Button>
        </div>
    </div>
    ) 
}
    )}
