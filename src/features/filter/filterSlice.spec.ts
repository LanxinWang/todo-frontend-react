import { TODO_MENU } from "../../constants/constants";
import filterReducer, { updateTodoFilter } from "./filterSlice";

describe("todo reducer",()=>{
    const initialState = {
        todoFilter: TODO_MENU.ALL,
      };
    it("should handle initial state",()=>{
        expect(filterReducer(undefined, { type: 'unknown' })).toEqual({
            "todoFilter": TODO_MENU.ALL
        });
    });
    it("should update todo filter value by todo menu option",()=>{
        const {todoFilter} = filterReducer(initialState, updateTodoFilter({menuOption: TODO_MENU.ACTIVE}));
        expect(todoFilter).toEqual(TODO_MENU.ACTIVE);
    });
});

