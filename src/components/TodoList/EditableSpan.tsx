import React, { ChangeEvent, useState } from "react";
import {TextField} from '@material-ui/core'

type EditableSpanType = {
  title: string
  changeTitle: (editedTitle: string) => void
};

export const EditableSpan = React.memo((props: EditableSpanType) => {
  
  const [editMode, setEditMode] = useState<boolean>(true)
  
  const [editedTitle, setEditedTitle] = useState<string>(props.title)
  
  const onEditMode = () => {
    setEditMode(true)
  }

  const offEditMode = () => {
    setEditMode(false)
    if(editedTitle.trim()) {
        props.changeTitle(editedTitle.trim())
    }
  }
  const onChangeTitle = (e: ChangeEvent<HTMLInputElement>) => {
    setEditedTitle(e.currentTarget.value)
  }
  return editMode ? <TextField
        autoFocus={true} 
        onBlur={offEditMode} 
        value={editedTitle}
        onChange={onChangeTitle}
        /> : <span onDoubleClick={onEditMode}> {props.title}</span>;
})
