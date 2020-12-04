import React from 'react'
import { Story, Meta } from '@storybook/react/types-6-0'
import { AddItemForm, AddItemFormType } from './AddItemForm'
import { action } from '@storybook/addon-actions';


export default {
    title: 'AddItem Form',
    component: AddItemForm,
    argTypes: {
        addItem: {
            description: 'add item when button is clicked'
        }
    },
} as Meta;


const Template: Story<AddItemFormType> = (args) => <AddItemForm {...args}/>

export const AddItemFormExample = Template.bind({})
AddItemFormExample.args = {
    addItem: action('Button clicked')
}
