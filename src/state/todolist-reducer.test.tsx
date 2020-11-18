import {todoListReducer} from './todolist-reducer'
import {v1} from 'uuid'
import {TodoListType} from '../components/TodoList/TodoList'
import {FilterValuesType} from '../App'
import {changeTodoListFilterAC,
        removeTodoListAC, 
        addTodoListAC, 
        changeTodoListTitleAC} from './todolist-reducer'

//---------вынесли в отдельную глобальную видимость--------
let todoListsId1: string;
let todoListsId2: string;
let startState: Array<TodoListType> = [];
beforeEach(() => {
    todoListsId1 = v1();
    todoListsId2 = v1();
    startState = [
        {id: todoListsId1, title: "What to learn", filter: "all"},
        {id: todoListsId2, title: "What to buy", filter: "all"}
    ]
})

test('correct todolist should be removed', () => {
   const endState = todoListReducer(startState, removeTodoListAC(todoListsId1))
   expect(endState.length).toBe(1);
   expect(endState[0].id).toBe(todoListsId2);
});

test('correct todolist should be added', () => {
    let newTodolistTitle = "New Todolist";
    const endState = todoListReducer(startState, addTodoListAC(newTodolistTitle))
    expect(endState.length).toBe(3);
    expect(endState[2].title).toBe(newTodolistTitle);
    expect(endState[2].filter).toBe("all")
 });
 

test('correct todolist should change its name', () => {
    let newTodolistTitle = "New Todolist";
    const action = changeTodoListTitleAC(todoListsId2, newTodolistTitle) 
    const endState = todoListReducer(startState, action);
    expect(endState[0].title).toBe("What to learn");
    expect(endState[1].title).toBe(newTodolistTitle);
 });


//--------------Changing Filter for todo list--------------
test('correct filter of todolist should be changed', () => {
    let newFilter: FilterValuesType = "completed";
    const action = changeTodoListFilterAC(newFilter, todoListsId2)
    const endState = todoListReducer(startState, action);
    expect(endState[0].filter).toBe("all");
    expect(endState[1].filter).toBe(newFilter);
 });
 
