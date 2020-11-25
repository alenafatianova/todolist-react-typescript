import React, {useState, ChangeEvent, KeyboardEvent} from 'react'
import {Button, TextField} from '@material-ui/core'
import {AddBox} from '@material-ui/icons'


type AddItemFormType = {
    addItem: (title: string) => void
}

export const AddItemForm = React.memo((props: AddItemFormType) => {
   
    console.log('AddItem form is called')
    
    const [title, setTitle] = useState <string>('')
    let [error, setError] = useState <string | null>() 
    
    const changeTitle = (e: ChangeEvent<HTMLInputElement>) => {
        setTitle(e.currentTarget.value) 
    }
    const onAddItemkKeyPress = (e: KeyboardEvent <HTMLInputElement>) => {
        if (error !== null) {
        setError(null)
    };
        if (e.key === 'Enter') {
            addItemClick()
        }
    }
    const addItemClick = () =>  {
        if(title.trim()) {
            props.addItem(title.trim()) 
            setTitle('')
        } else {
            setError('Title is required!')
        }
    }
    
    return (
        <div>
            <div>
            <TextField
                value={title} 
                onChange={ changeTitle }
                onKeyPress={onAddItemkKeyPress}
                variant={'outlined'}
                size={'small'}
                error={!!error}
                label={'Title'}
                helperText={error}
            />
            <Button 
                size={'small'}
                color={'primary'} 
                onClick={addItemClick}><AddBox>+</AddBox>
            </Button>
            { error && <div className={'error-message'}>{error}</div>}
        </div>
        </div>
    )
})