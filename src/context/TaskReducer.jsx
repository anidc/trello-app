export const initialState = {
  tasks: [],
};

export const taskReducer = (state, action) => {
  switch (action.type) {
    case "SET_TASKS": {
      const updatedTasks = action.payload;
      return { ...state, tasks: updatedTasks };
    }

    case "MOVE_TASK": {
      const updated = state.tasks.map((task) =>
        task.id === action.payload.id
          ? { ...task, status: action.payload.status }
          : task
      );
      return { ...state, tasks: updated };
    }

    case "ADD_TASK": {
      return { ...state, tasks: [action.payload, ...state.tasks] };
    }

    default:
      return state;
  }
};
