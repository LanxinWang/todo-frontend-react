import { screen } from "@testing-library/react";
import TodoHeader from "./index";
import {renderWithProviders} from "../../utils/test-utils"

const setup = () => {
    renderWithProviders(<TodoHeader/>)
};

describe("Todo Header", () => {
  test("should renders TodoHeader", () => {
    setup();
    const newTodoInput = screen.getByPlaceholderText("What needs to be done?");
    const toggleAllButton = screen.getByLabelText("❯");
    expect(newTodoInput).toBeInTheDocument();
    expect(toggleAllButton).toBeInTheDocument();
  });
});
