import {tasksReducer} from './tasks-reducer';
import {TasksStateType} from '../components/TodoList/TodoList';
import {removeTaskAC} from './tasks-reducer'
import {changeTaskStatusAC} from './tasks-reducer'

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
    expect(endState["todolistId1"].length).toBe(XXX);
    expect(endState["todolistId2"].length).toBe(XXX);
    expect(endState["todolistId2"][0].id).toBeDefined();
    expect(endState["todolistId2"][0].title).toBe(XXX);
    expect(endState["todolistId2"][0].isDone).toBe(XXX);
 })