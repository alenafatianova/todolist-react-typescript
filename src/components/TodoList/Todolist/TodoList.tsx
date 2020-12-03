import React, {useCallback} from 'react'
import {AddItemForm } from '../AddItemForm/AddItemForm';
import {FilterValuesType } from '../../../App';
import {EditableSpan } from '../EditableSpan/EditableSpan';
import {Button, IconButton } from '@material-ui/core'
import {Delete} from '@material-ui/icons'
import {Task} from '../Task/Task'

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
    key: string
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
}


export const TodoList = React.memo(function TodoList(props: PropsType)  {
    
    console.log('todolist called')

    const removeTodoList = () => {props.removeTodoList(props.id)}
    const onSetAllFilterClick = useCallback(() => props.changeFilter("all", props.id), [props.changeFilter, props.id]) 
    const onSetActiveFilterClick = useCallback(() => props.changeFilter("active", props.id), [props.changeFilter, props.id])
    const onSetCompletedFilterClick = useCallback(() => props.changeFilter('completed', props.id), [props.changeFilter, props.id])
    
    const addTask = useCallback((newTaskTitle: string) => {
        props.addTask(newTaskTitle, props.id) 
    }, [props.id, props.addTask])  
    
    const changeTodoListTitle = useCallback((title: string) => {
        props.changeTodoListTitle(props.id, title)
    }, [props.id, props.changeTodoListTitle])
    

    let tasksForTodoList = props.tasks;
    
    if (props.filter === "active") {
        tasksForTodoList = props.tasks.filter(t => t.isDone === false);
    } 
      if (props.filter === "completed") {
        tasksForTodoList = props.tasks.filter(t => t.isDone === true);
    }
    

    return (      
        <div>
        <div>
        <h3><EditableSpan title={props.title} changeTitle={changeTodoListTitle} />
        <IconButton  onClick={removeTodoList}><Delete>X</Delete></IconButton>
        </h3> 
        <AddItemForm addItem={addTask}/>
        </div>
        <div>
        {tasksForTodoList.map(t => {
                return <Task 
                    key={t.id}
                    task={t} 
                    todoListID={props.id}
                    removeTask={props.removeTask}
                    changeTaskTitle={props.changeTaskTitle}
                    changeStatus={props.changeStatus}
                    />
        })
        }
        </div>
        <div style={{paddingTop: '10px'}}>
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
})


