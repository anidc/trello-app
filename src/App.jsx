import React, { useEffect, useReducer } from "react";
import Column from "./components/Column";
import { taskReducer, initialState } from "./context/TaskReducer";
import { Box, CssBaseline } from "@mui/material";
import { DragDropContext } from "@hello-pangea/dnd";
import Sidebar from "./components/Sidebar";

export default function App() {
  const [state, dispatch] = useReducer(taskReducer, initialState);

  useEffect(() => {
    const loadData = async () => {
      const res = await fetch(
        "https://jsonplaceholder.typicode.com/todos?_limit=12"
      );
      const data = await res.json();

      const mapped = data.map((item) => ({
        id: item.id,
        title: item.title,
        status: ["todo", "inprogress", "done"][item.id % 3],
      }));

      dispatch({ type: "SET_TASKS", payload: mapped });
    };

    loadData();
  }, []);

  const grouped = {
    todo: state.tasks.filter((t) => t.status === "todo"),
    inprogress: state.tasks.filter((t) => t.status === "inprogress"),
    done: state.tasks.filter((t) => t.status === "done"),
  };
  const handleDragEnd = (result) => {
    const { source, destination, draggableId } = result;
    if (!destination || source.droppableId === destination.droppableId) return;

    dispatch({
      type: "MOVE_TASK",
      payload: {
        id: parseInt(draggableId),
        status: destination.droppableId,
      },
    });
  };

  return (
    <>
      <Sidebar />
      <CssBaseline />
      <DragDropContext onDragEnd={handleDragEnd}>
        <Box
          sx={{
            display: "grid",
            gap: 2,
            padding: 2,
            marginLeft: { md: "80px" },
            gridTemplateColumns: {
              xs: "1fr",
              sm: "1fr 1fr",
              md: "1fr 1fr 1fr",
            },
          }}
        >
          <Column title="To Do" tasks={grouped.todo} droppableId="todo" />
          <Column
            title="In Progress"
            tasks={grouped.inprogress}
            droppableId="inprogress"
          />
          <Column title="Done" tasks={grouped.done} droppableId="done" />
        </Box>
      </DragDropContext>
    </>
  );
}
