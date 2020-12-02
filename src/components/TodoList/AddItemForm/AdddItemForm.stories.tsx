import React from 'react'
import { Story, Meta } from '@storybook/react/types-6-0'
import { AddItemForm } from './AddItemForm'
import {action} from '@storybook/addon-actions'

export default {
    title: 'AddItem Form',
    component: AddItemForm,
} as Meta;


const actionCallback = action('item form was clicked with this value:')

export const AddItemFormStories: Story<AddItemFormProps> = (props: any) => {
   return  <AddItemForm addItem={actionCallback}/>
}