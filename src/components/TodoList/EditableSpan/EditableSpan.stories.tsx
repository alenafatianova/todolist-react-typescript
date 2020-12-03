import React from 'react'
import {Meta, Story} from '@storybook/react/types-6-0'
import { EditableSpan } from './EditableSpan';
import {action} from '@storybook/addon-actions'


export default {
    title: 'Editable Span Stories',
    component: EditableSpan
} as Meta;

const changeTitleCallback = action('title is changed')

export const EditableSpanStories = () => {
    return <>
        <EditableSpan title={'qwerty'} changeTitle={changeTitleCallback}/>
    </>
}