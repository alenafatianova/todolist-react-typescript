import {TasksStateType, TodoListType} from '../components/TodoList/TodoList'
import {tasksReducer} from './tasks-reducer'
import {addTodoListAC, todoListReducer} from './todolist-reducer'

test('ids should be equals', () => {
    const startTasksState: TasksStateType = {};
    const startTodolistsState: Array<TodoListType> = [];
    
    const action = addTodoListAC("new todolist");
    
    const endTasksState = tasksReducer(startTasksState, action)
    const endTodolistsState = todoListReducer(startTodolistsState, action)
    
    const keys = Object.keys(endTasksState);
    const idFromTasks = keys[0];
    const idFromTodolists = endTodolistsState[0].id;
    
    expect(idFromTasks).toBe(action.todoListID);
    expect(idFromTodolists).toBe(action.todoListID);
 });
 