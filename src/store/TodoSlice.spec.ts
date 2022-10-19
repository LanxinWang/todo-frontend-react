import todoReducer, {todoState, createTodo, deleteTodo} from "./TodoSlice";

const mockTodo = [{
    id: "0",
    status: "active",
    name: "todo1"
},
{
    id: "1",
    status: "active",
    name: "todo2"
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
    it("should delete todo for id",()=>{
        const {todoList} = todoReducer(initialState, deleteTodo({id:"0"}));
        expect(todoList).toEqual([{
            id: "1",
            status: "active",
            name: "todo2"
        }])
    });

})  
