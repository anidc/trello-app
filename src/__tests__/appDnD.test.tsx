import React, { act } from "react";
import { render, waitFor } from "@testing-library/react";
import { ThemeProvider, createTheme } from "@mui/material/styles";
import { MemoryRouter } from "react-router-dom";
import axios from "../utils/axios";

jest.mock("../utils/axios");

jest.mock("../components/Sidebar", () => () => <aside />);
jest.mock("../components/Navbar", () => () => <header />);
jest.mock("../components/NewTaskModal", () => () => null);
jest.mock("../components/OfflineBanner", () => () => null);

let capturedOnDragEnd: ((result: any) => void) | null = null;

jest.mock("@hello-pangea/dnd", () => {
  const React = require("react");
  return {
    DragDropContext: ({ onDragEnd, children }: any) => {
      capturedOnDragEnd = onDragEnd;
      return <div data-testid="dnd-context">{children}</div>;
    },
    Droppable: ({ droppableId, children }: any) => {
      const provided = {
        innerRef: jest.fn(),
        droppableProps: { "data-rbd-droppable-id": droppableId },
        placeholder: null,
      };
      return <div {...provided.droppableProps}>{children(provided)}</div>;
    },
    Draggable: ({ draggableId, children }: any) => {
      const provided = {
        innerRef: jest.fn(),
        draggableProps: { "data-rbd-draggable-id": draggableId },
        dragHandleProps: {},
      };
      const snapshot = { isDragging: false };
      return children(provided, snapshot);
    },
  };
});

import App from "../App";

const mockTodos = [
  { id: 1, title: "Task 1", completed: false },
  { id: 2, title: "Task 2", completed: false },
  { id: 3, title: "Task 3", completed: true },
];

beforeEach(() => {
  (axios.get as jest.Mock).mockResolvedValue({ data: mockTodos });
  capturedOnDragEnd = null;
});

const renderApp = () =>
  render(
    <ThemeProvider theme={createTheme()}>
      <MemoryRouter>
        <App />
      </MemoryRouter>
    </ThemeProvider>
  );

describe("<App /> drag & drop", () => {
  it("moves task from todo → done (unit-level reducer check)", async () => {
    const { container } = renderApp();

    await waitFor(() => {
      expect(
        container.querySelector('[data-rbd-droppable-id="todo"]')!.textContent
      ).toMatch(/Task 1/);
      expect(
        container.querySelector('[data-rbd-droppable-id="inprogress"]')!
          .textContent
      ).not.toMatch(/Task 1/);
      expect(
        container.querySelector('[data-rbd-droppable-id="done"]')!.textContent
      ).not.toMatch(/Task 1/);
    });

    expect(capturedOnDragEnd).toBeInstanceOf(Function);
    act(() => {
      capturedOnDragEnd!({
        draggableId: "1",
        source: { droppableId: "todo", index: 0 },
        destination: { droppableId: "done", index: 0 },
      });
    });

    await waitFor(() => {
      const todoText = container.querySelector(
        '[data-rbd-droppable-id="todo"]'
      )!.textContent;
      const doneText = container.querySelector(
        '[data-rbd-droppable-id="done"]'
      )!.textContent;

      expect(todoText).not.toMatch(/Task 1/);
      expect(doneText).toMatch(/Task 1/);
    });
  });

  it("task marked with completed: moves from todo → done", async () => {
    const { container } = renderApp();

    await waitFor(() => {
      expect(
        container.querySelector('[data-rbd-droppable-id="done"]')!.textContent
      ).toMatch(/Task 3/);
      expect(
        container.querySelector('[data-rbd-droppable-id="inprogress"]')!
          .textContent
      ).not.toMatch(/Task 3/);
      expect(
        container.querySelector('[data-rbd-droppable-id="todo"]')!.textContent
      ).not.toMatch(/Task 3/);
    });
  });
});
