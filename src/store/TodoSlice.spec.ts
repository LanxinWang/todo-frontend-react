import { TODO_MENU } from "../constants/constants";
import { getLocalStorage } from "../LocalStorage";
import todoReducer, {todoState, createTodo, deleteTodo, updateTodoStatus, updateAllTodosStatus, deleteAllCompletedTodos, updateTodoFilter} from "./TodoSlice";

const mockTodo = [{
    id: 1,
    status: "completed",
    name: "todo2"
},
{
    id: 0,
    status: "active",
    name: "todo1"
}]
describe("todo reducer",()=>{
    const initialState: todoState = {
        todoList: mockTodo,
        todoFilter: TODO_MENU.ALL
      };
    it("should handle initial state",()=>{
        expect(todoReducer(undefined, { type: 'unknown' })).toEqual({
            "todoList": [],
            "todoFilter": TODO_MENU.ALL
        });
    });
    it("should create todo for name",()=>{
        const {todoList} = todoReducer(initialState, createTodo({name:"todo3"}));
        expect(todoList.length).toBe(3);
        expect(todoList[0].name).toEqual("todo3")

    });
    it("should delete todo by id",()=>{
        const {todoList} = todoReducer(initialState, deleteTodo({id: 0}));
        expect(todoList).toEqual([{
            id: 1,
            status: "completed",
            name: "todo2"
        },
        {
            id: 0,
            status: "deleted",
            name: "todo1"
        }])
    });
    it("should update todo whether finished status by id",()=>{
        todoReducer(initialState, updateTodoStatus({id: 0, isChecked: false}));
        const {todoList} = todoReducer(initialState, updateTodoStatus({id: 0, isChecked: true}));
        expect(todoList).toEqual([{
            id: 1,
            status: "completed",
            name: "todo2"
        },
        {
            id: 0,
            status: "completed",
            name: "todo1"
        }])
    });
    it("should update all todos whether finished status",()=>{
        todoReducer(initialState, updateAllTodosStatus({checkFlag: false}));
        const {todoList} = todoReducer(initialState, updateAllTodosStatus({checkFlag: true}));
        expect(todoList).toEqual([{
            id: 1,
            status: "completed",
            name: "todo2"
        },
        {
            id: 0,
            status: "completed",
            name: "todo1"
        }])
    });
    it("should delete all todos which status is completed",()=>{
        const {todoList} = todoReducer(initialState, deleteAllCompletedTodos());
        expect(todoList).toEqual([{
            id: 1,
            status: "deleted",
            name: "todo2"
        },
        {
            id: 0,
            status: "active",
            name: "todo1"
        }])
    });
    it("should update todo filter value by todo menu option",()=>{
        const {todoFilter} = todoReducer(initialState, updateTodoFilter({menuOption: TODO_MENU.ACTIVE}));
        expect(todoFilter).toEqual(TODO_MENU.ACTIVE);
    });
})  
