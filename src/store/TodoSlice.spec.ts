import todoReducer, {todoState, createTodo, deleteTodo, updateTodoStatus} from "./TodoSlice";

const mockTodo = [{
    id: 1,
    status: "active",
    name: "todo2"
},
{
    id: 0,
    status: "active",
    name: "todo1"
}]
describe("todo reducer",()=>{
    const initialState: todoState = {
        todoList: [...mockTodo]
      };
    it("should handle initial state",()=>{
        expect(todoReducer(undefined, { type: 'unknown' })).toEqual({
            "todoList": []
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
            status: "active",
            name: "todo2"
        }])
    });
    it("should update todo status by id",()=>{
        const {todoList} = todoReducer(initialState, updateTodoStatus({id: 0, isChecked: true}));
        expect(todoList).toEqual([{
            id: 1,
            status: "active",
            name: "todo2"
        },
        {
            id: 0,
            status: "completed",
            name: "todo1"
        }])
    });

})  
