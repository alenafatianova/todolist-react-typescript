import React from 'react'
import { Story, Meta } from '@storybook/react/types-6-0'
import { AddItemForm } from './AddItemForm'

export default {
    title: 'AddItem Form',
    component: AddItemForm,
} as Meta;

export const AddItemFormStories: Story<AddItemFormProps> = (props: any) => {
   return  <AddItemForm/>
}