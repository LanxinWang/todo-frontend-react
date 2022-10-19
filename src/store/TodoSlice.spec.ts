import todoReducer, {todoState, createTodo} from "./TodoSlice";

const mockTodo = {
    id: "test-id",
    status: "test-status",
    name: "todo1"
}
describe("todo reducer",()=>{
    const initialState: todoState = {
        todoList: [mockTodo]
      };
    it("should handle initial state",()=>{
        expect(todoReducer(undefined, { type: 'unknown' })).toEqual({
            "todoList": []
        });
    })
    it("should create todo for name",()=>{
        const {todoList} = todoReducer(initialState, createTodo({name:"todo2"}));
        expect(todoList.length).toBe(2);
        expect(todoList[0].name).toEqual("todo2")

    })
})  
