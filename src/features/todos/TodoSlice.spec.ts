import { RootState } from "../../store/store";
import todoReducer, {todoState, createTodo, deleteTodo, updateTodoStatus, updateAllTodosStatus, deleteAllCompletedTodos, selectTodos, selectDeletedTodos, selectCompletedTodos} from "./TodoSlice";

const mockTodo = [{
    id: 1,
    status: "completed",
    name: "todo2"
},
{
    id: 0,
    status: "active",
    name: "todo1"
}];
const mockRootState: RootState = {
    todo: {
        todoList: mockTodo
    },
    filter: {
        todoFilter: "all",
    },
};  
describe("todo reducer",()=>{
    const initialState: todoState = {
        todoList: mockTodo,
      };
    it("should handle initial state",()=>{
        expect(todoReducer(undefined, { type: 'unknown' })).toEqual({
            "todoList": [],
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
    it("should return todos list",()=>{      
        expect(selectTodos(mockRootState)).toEqual(mockTodo)
    });
    it("should return deleted todos list",()=>{       
        expect(selectDeletedTodos(mockRootState)).toEqual([])
    });
    it("should return completed todos list",()=>{     
        expect(selectCompletedTodos(mockRootState)).toEqual([mockTodo[0]])
    });
    
})  
