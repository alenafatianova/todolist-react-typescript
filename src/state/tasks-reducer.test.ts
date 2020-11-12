import {TasksStateType} from '../components/TodoList/TodoList';
import {tasksReducer, removeTaskAC, addTaskAC, changeTaskStatusAC, changeTaskTitleAC} from './tasks-reducer'
import {addTodoListAC, removeTodoListAC} from './todolist-reducer'

test('correct task should be deleted from correct array', () => {
   const startState: TasksStateType = {
       "todolistId1": [
           { id: "1", title: "CSS", isDone: false },
           { id: "2", title: "JS", isDone: true },
           { id: "3", title: "React", isDone: false }
       ],
       "todolistId2": [
           { id: "1", title: "bread", isDone: false },
           { id: "2", title: "milk", isDone: true },
           { id: "3", title: "tea", isDone: false }
       ]
    };
   const action = removeTaskAC("2", "todolistId2");
 
   const endState = tasksReducer(startState, action)
   
   expect(endState["todolistId1"].length).toBe(3);
   expect(endState["todolistId2"].length).toBe(2);  
   expect(endState["todolistId2"].every(t => t.id != "2")).toBeTruthy();
});

test('status of specified task should be changed', () => {
    const startState: TasksStateType = {
        "todolistId1": [
            { id: "1", title: "CSS", isDone: false },
            { id: "2", title: "JS", isDone: true },
            { id: "3", title: "React", isDone: false }
        ],
        "todolistId2": [
            { id: "1", title: "bread", isDone: false },
            { id: "2", title: "milk", isDone: true },
            { id: "3", title: "tea", isDone: false }
        ]
    };
    const action = changeTaskStatusAC("2", false, "todolistId2");
    
    const endState = tasksReducer(startState, action)
    expect(endState).toEqual({
        "todolistId1": [
            { id: "1", title: "CSS", isDone: false },
            { id: "2", title: "JS", isDone: true },
            { id: "3", title: "React", isDone: false }
        ],
        "todolistId2": [
            { id: "1", title: "bread", isDone: false },
            { id: "2", title: "milk", isDone: false },
            { id: "3", title: "tea", isDone: false }
        ]
    })
 
  });

test('title of specified task should be changed', () => {
    const startState: TasksStateType = {
        "todolistId1": [
            { id: "1", title: "CSS", isDone: false },
            { id: "2", title: "JS", isDone: true },
            { id: "3", title: "React", isDone: false }
        ],
        "todolistId2": [
            { id: "1", title: "bread", isDone: false },
            { id: "2", title: "milk", isDone: true },
            { id: "3", title: "tea", isDone: false }
        ]
    };
    const action = changeTaskTitleAC("2", "chocolate", "todolistId2");
    
    const endState = tasksReducer(startState, action)
    expect(endState).toEqual({
        "todolistId1": [
            { id: "1", title: "CSS", isDone: false },
            { id: "2", title: "JS", isDone: true },
            { id: "3", title: "React", isDone: false }
        ],
        "todolistId2": [
            { id: "1", title: "bread", isDone: false },
            { id: "2", title: "chocolate", isDone: true },
            { id: "3", title: "tea", isDone: false }
        ]
    })
 
  });

test('correct task should be added to correct array', () => {
    const startState: TasksStateType = {
        "todolistId1": [
            { id: "1", title: "CSS", isDone: false },
            { id: "2", title: "JS", isDone: true },
            { id: "3", title: "React", isDone: false }
        ],
        "todolistId2": [
            { id: "1", title: "bread", isDone: false },
            { id: "2", title: "milk", isDone: true },
            { id: "3", title: "tea", isDone: false }
        ]
    };
    const action = addTaskAC("juice", "todolistId2");
    const endState = tasksReducer(startState, action)
    expect(endState["todolistId1"].length).toBe(3);
    expect(endState["todolistId2"].length).toBe(4);
    expect(endState["todolistId2"][0].id).toBeDefined();
    expect(endState["todolistId2"][0].title).toBe("juice");
    expect(endState["todolistId2"][0].isDone).toBe(false);
 })

test('new property with array should be added when new todolist is added', () => {
    const startState: TasksStateType = {
        "todoListId1": [
            { id: "1", title: "CSS", isDone: false },
            { id: "2", title: "JS", isDone: true },
            { id: "3", title: "React", isDone: false }
        ],
        "todoListId2": [
            { id: "1", title: "bread", isDone: false },
            { id: "2", title: "milk", isDone: true },
            { id: "3", title: "tea", isDone: false }
        ]
    };
    const action = addTodoListAC("new todolist");
    const endState = tasksReducer(startState, action)
    const keys = Object.keys(endState);
    const newKey = keys.find(k => k != "todoListId1" && k != "todoListId2");
    if (!newKey) {
        throw Error("new key should be added")
    }
    expect(keys.length).toBe(3);
    expect(endState[newKey]).toEqual([]);
 });

 test('property with todolistId should be deleted', () => {
    const startState: TasksStateType = {
        "todoListId1": [
            { id: "1", title: "CSS", isDone: false },
            { id: "2", title: "JS", isDone: true },
            { id: "3", title: "React", isDone: false }
        ],
        "todoListId2": [
            { id: "1", title: "bread", isDone: false },
            { id: "2", title: "milk", isDone: true },
            { id: "3", title: "tea", isDone: false }
        ]
    };
    const action = removeTodoListAC("todoListId2");
    const endState = tasksReducer(startState, action)
    const keys = Object.keys(endState);
    expect(keys.length).toBe(1);
    expect(endState["todoListId2"]).toBeUndefined();
 });