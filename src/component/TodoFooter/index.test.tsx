import { screen } from "@testing-library/react";
import { TODO_MENU } from "../../constants/constants";
import { renderWithProviders } from "../../utils/test-utils";
import TodoFooter from "./index";

describe("Todo Footer", () => {
  const setup = () => {
    renderWithProviders(<TodoFooter />,);
  };

  test("should render TodoFooter", () => {
    setup();
    expect(screen.getByText(TODO_MENU.ACTIVE)).toBeInTheDocument();
    expect(screen.getByText(TODO_MENU.COMPLETED)).toBeInTheDocument();
    expect(screen.getByText(TODO_MENU.ALL)).toBeInTheDocument();
    expect(screen.getByText("items left")).toBeInTheDocument();
    expect(screen.getByText("Clear completed")).toBeInTheDocument();
  });
});
