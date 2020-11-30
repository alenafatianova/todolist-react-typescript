import React, {ChangeEvent, useCallback} from 'react'
import {Checkbox, Button} from '@material-ui/core'
import {EditableSpan} from '../components/TodoList/EditableSpan'
import {Delete} from '@material-ui/icons'



export type TaskType = {
    id: string
    title: string
    isDone: boolean
};

export type PropsTaskType = {
    task: TaskType
    todoListID: string
    removeTask: (taskID: string, todoListsID: string) => void
    changeTaskTitle: (taskID: string, editedTitle: string, todoListsID: string) => void
    changeStatus: (taskID: string, isDone: boolean, todoListsID: string) => void
}

export const Task = React.memo((props: PropsTaskType) => { 
    
    const changeTitle = useCallback((editedTitle: string) => {
        props.changeTaskTitle(props.task.id, editedTitle, props.todoListID)
    }, [props.task.id, props.changeTaskTitle, props.todoListID])

    const removeTask = useCallback(() =>  {  
        props.removeTask(props.task.id, props.todoListID)
    }, [props.todoListID, props.task.id, props.removeTask])

    const changeStatus = useCallback((e: ChangeEvent<HTMLInputElement>) => {
        let newStatus = e.currentTarget.checked
        props.changeStatus(props.task.id, newStatus, props.todoListID)
    }, [props.changeStatus, props.task.id, props.todoListID])

    return <div>
        <li key={props.task.id} 
        className={props.task.isDone ? 'isDone' : ''}> 
        <Checkbox 
            checked={props.task.isDone}
            onChange={changeStatus}
            color={'primary'}/>
            <EditableSpan title={props.task.title} changeTitle={changeTitle} />
            <Button  onClick={removeTask}>
                <Delete>X</Delete>
            </Button>
        </li>
    </div>

})