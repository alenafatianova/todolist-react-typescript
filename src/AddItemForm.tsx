import React, {useState, ChangeEvent, KeyboardEvent} from 'react'


type AddItemFormType = {
    addItem: (title: string) => void
}

export  function AddItemForm(props: AddItemFormType) {
    
    const [title, setTitle] = useState <string>('')
    let [error, setError] = useState <string | null>() 
    
    const changeTitle = (e: ChangeEvent<HTMLInputElement>) => {
        {setTitle(e.currentTarget.value) }
    }
    const onAddItemkKeyPress = (e: KeyboardEvent <HTMLInputElement>) => {
        setError(null);
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
            <input 
                value={title} 
                onChange={ changeTitle }
                onKeyPress={onAddItemkKeyPress}
                className={error ? 'error': ''} 
            />
            <button onClick={addItemClick}>+</button>
            { error && <div className={'error-message'}>{error}</div>}
        </div>
        </div>
    )
}
