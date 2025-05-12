import React, { useEffect, useReducer, useState } from "react";
import Column from "./components/Column";
import { taskReducer, initialState } from "./context/TaskReducer";
import { Box, CssBaseline, useMediaQuery, useTheme } from "@mui/material";
import { DragDropContext } from "@hello-pangea/dnd";
import Sidebar from "./components/Sidebar";
import Navbar from "./components/Navbar";

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

  const theme = useTheme();
  const isSmallScreen = useMediaQuery(theme.breakpoints.down("md"));
  const [open, setOpen] = useState(!isSmallScreen);

  useEffect(() => {
    if (isSmallScreen) {
      setOpen(false);
    } else {
      setOpen(true);
    }
  }, [isSmallScreen]);

  const toggleDrawer = () => {
    setOpen((prevState) => !prevState);
  };

  return (
    <>
      <Sidebar open={open} toggleDrawer={toggleDrawer} />
      <CssBaseline />
      <Box sx={{ marginLeft: { md: "80px" } }}>
        <Navbar open={open} toggleDrawer={toggleDrawer} />
        <DragDropContext onDragEnd={handleDragEnd}>
          <Box
            sx={{
              display: "grid",
              gap: 2,
              padding: { xs: 2, md: 4 },
              paddingTop: { xs: 4 },
              gridTemplateColumns: {
                xs: "1fr",
                sm: "1fr 1fr",
                md: "1fr 1fr 1fr",
              },
              "@media screen and (min-width: 1440px)": {
                display: "flex",
                flexDirection: "row",
                alignItems: "start",
                justifyContent: "start",
                flexWrap: "wrap",
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
      </Box>
    </>
  );
}
