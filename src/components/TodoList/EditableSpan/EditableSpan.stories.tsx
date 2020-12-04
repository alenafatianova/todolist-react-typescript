import React from 'react'
import {Meta, Story} from '@storybook/react/types-6-0'
import { EditableSpan, EditableSpanType } from './EditableSpan';
import { action } from '@storybook/addon-actions'


export default {
    title: 'Editable Span Stories',
    component: EditableSpan,
    argTypes: {
       title: {
        description: 'title can be changed on double click',
        defaultValue: 'default value',
        name: 'Editable span',
       }
    }
} as Meta;

const Template: Story<EditableSpanType> = (args) => <EditableSpan {...args}/>
export const EditableSpanExample = Template.bind({})
EditableSpanExample.args = {
    title: "default value",
    changeTitle: action('Editable span is clicked')
}