import {todoListReducer} from './todolist-reducer'
import {v1} from 'uuid'
import {TodoListType} from '../components/TodoList/TodoList'
import {FilterValuesType} from '../App'
import {changeTodoListFilterAC,
        removeTodoListAC, 
        addTodoListAC, 
        changeTodoListTitleAC} from './todolist-reducer'



test('correct todolist should be removed', () => {
   let todoListsID1 = v1();
   let todoListsID2 = v1();
   
   const startState: Array<TodoListType> = [
       {id: todoListsID1, title: "What to learn", filter: "all"},
       {id: todoListsID2, title: "What to buy", filter: "all"}
   ]
   const endState = todoListReducer(startState, removeTodoListAC(todoListsID1))
   expect(endState.length).toBe(1);
   expect(endState[0].id).toBe(todoListsID2);
});

test('correct todolist should be added', () => {
    
    let todoListsID1 = v1();
    let todoListsID2 = v1();
    
    let newTodolistTitle = "New Todolist";
    
    const startState: Array<TodoListType> = [
        {id: todoListsID1, title: "What to learn", filter: "all"},
        {id: todoListsID2, title: "What to buy", filter: "all"}
    ]
    const endState = todoListReducer(startState, addTodoListAC(newTodolistTitle))
    expect(endState.length).toBe(3);
    expect(endState[2].title).toBe(newTodolistTitle);
    expect(endState[2].filter).toBe("all")
 });
 

test('correct todolist should change its name', () => {
    
    let todoListsID1 = v1();
    let todoListsID2 = v1();
    
    let newTodolistTitle = "New Todolist";
    
    const startState: Array<TodoListType> = [
        {id: todoListsID1, title: "What to learn", filter: "all"},
        {id: todoListsID2, title: "What to buy", filter: "all"}
    ]
    const action = changeTodoListTitleAC(todoListsID2, newTodolistTitle) 
    
    const endState = todoListReducer(startState, action);
    expect(endState[0].title).toBe("What to learn");
    expect(endState[1].title).toBe(newTodolistTitle);
 });


//--------------Changing Filter for todo list--------------
test('correct filter of todolist should be changed', () => {
    let todoListsID1 = v1();
    let todoListsID2 = v1();
    let newFilter: FilterValuesType = "completed";
    
     const startState: Array<TodoListType> = [
        
        {id: todoListsID1, title: "What to learn", filter: "all"},
        {id: todoListsID2, title: "What to buy", filter: "all"}
    ]
    const action = changeTodoListFilterAC(newFilter, todoListsID2)
    
    const endState = todoListReducer(startState, action);
    expect(endState[0].filter).toBe("all");
    expect(endState[1].filter).toBe(newFilter);
 });
 