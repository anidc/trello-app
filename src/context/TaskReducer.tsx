export type Task = {
  id: number;
  title: string;
  status: string;
};

export type State = {
  tasks: Task[];
};

export type Action =
  | { type: "SET_TASKS"; payload: Task[] }
  | {
      type: "MOVE_TASK";
      payload: {
        id: number;
        sourceIndex: number;
        destinationIndex: number;
        sourceStatus: string;
        destinationStatus: string;
      };
    }
  | { type: "ADD_TASK"; payload: Task };

export const MOVE_TASK = "MOVE_TASK";

export const initialState: State = {
  tasks: [],
};

export const taskReducer = (state: State, action: Action): State => {
  switch (action.type) {
    case "SET_TASKS": {
      const updatedTasks = action.payload;
      return { ...state, tasks: updatedTasks };
    }

    case "MOVE_TASK": {
      const {
        id,
        sourceIndex,
        destinationIndex,
        sourceStatus,
        destinationStatus,
      } = action.payload;

      const updatedTasks = [...state.tasks];
      const movingTaskIndex = updatedTasks.findIndex((task) => task.id === id);
      if (movingTaskIndex === -1) return state;

      const movingTask: Task = {
        ...updatedTasks[movingTaskIndex],
        status: destinationStatus,
      };

      updatedTasks.splice(movingTaskIndex, 1);

      const tasksInDestination = updatedTasks.filter(
        (task) => task.status === destinationStatus
      );

      const beforeTask = tasksInDestination[destinationIndex];
      if (beforeTask) {
        const beforeIndex = updatedTasks.findIndex(
          (task) => task.id === beforeTask.id
        );
        updatedTasks.splice(beforeIndex, 0, movingTask);
      } else {
        updatedTasks.push(movingTask);
      }

      return { ...state, tasks: updatedTasks };
    }

    case "ADD_TASK": {
      return { ...state, tasks: [action.payload, ...state.tasks] };
    }

    default:
      return state;
  }
};
