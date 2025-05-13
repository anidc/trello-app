import { taskReducer } from "../context/TaskReducer";
import type { Task, State } from "../context/TaskReducer";

const sample: Task[] = [
  { id: 1, title: "A", status: "todo" },
  { id: 2, title: "B", status: "inprogress" },
  { id: 3, title: "C", status: "done" },
];

describe("taskReducer", () => {
  it("SET_TASKS replaces tasks array", () => {
    const initial: State = { tasks: [] };
    const out = taskReducer(initial, { type: "SET_TASKS", payload: sample });
    expect(out.tasks).toEqual(sample);
  });

  it("ADD_TASK prepends new task", () => {
    const initial: State = { tasks: sample };
    const newTask = { id: 4, title: "D", status: "todo" };
    const out = taskReducer(initial, { type: "ADD_TASK", payload: newTask });
    expect(out.tasks).toHaveLength(4);
    expect(out.tasks[0]).toEqual(newTask);
  });

  it("MOVE_TASK updates status & order", () => {
    const initial: State = { tasks: sample };
    const out = taskReducer(initial, {
      type: "MOVE_TASK",
      payload: {
        id: 1,
        sourceIndex: 0,
        destinationIndex: 1,
        sourceStatus: "todo",
        destinationStatus: "inprogress",
      },
    });

    const moved = out.tasks.find((t) => t.id === 1)!;
    expect(moved.status).toBe("inprogress");

    const inprogress = out.tasks.filter((t) => t.status === "inprogress");
    expect(inprogress.map((t) => t.id)).toEqual([2, 1]);
  });
});
