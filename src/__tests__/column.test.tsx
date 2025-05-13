import React from "react";
import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";

const TaskCardMock = jest.fn();

jest.mock("../components/TaskCard", () => ({
  __esModule: true,
  default: (props: any) => {
    TaskCardMock(props);
    return <div data-testid="task-card" />;
  },
}));

jest.mock("@hello-pangea/dnd", () => {
  const React = require("react");
  return {
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

import Column from "../components/Column";

const tasks = [
  { id: 1, title: "Task A", status: "todo" },
  { id: 2, title: "Task B", status: "todo" },
];

describe("<Column />", () => {
  it("shows title and task count", () => {
    render(
      <Column
        title="To Do"
        tasks={tasks}
        droppableId="todo"
        onOpenNewTaskModal={() => {}}
        status="todo"
        isLoggedIn={true}
      />
    );

    expect(screen.getByText(/to do/i)).toBeInTheDocument();
    expect(screen.getByText("(2)")).toBeInTheDocument();
  });

  it("fires onOpenNewTaskModal with column status", async () => {
    const spy = jest.fn();
    render(
      <Column
        title="To Do"
        tasks={tasks}
        droppableId="todo"
        onOpenNewTaskModal={spy}
        status="todo"
        isLoggedIn={true}
      />
    );

    await userEvent.click(screen.getByRole("button", { name: /add task/i }));

    expect(spy).toHaveBeenCalledTimes(1);
    expect(spy).toHaveBeenCalledWith("todo");
  });

  it("renders a TaskCard for every task", () => {
    TaskCardMock.mockClear();

    render(
      <Column
        title="To Do"
        tasks={tasks}
        droppableId="todo"
        onOpenNewTaskModal={() => {}}
        status="todo"
        isLoggedIn={true}
      />
    );

    expect(TaskCardMock).toHaveBeenCalledTimes(tasks.length);

    expect(TaskCardMock).toHaveBeenCalledWith(
      expect.objectContaining({ task: tasks[0], index: 0 })
    );
  });
});
