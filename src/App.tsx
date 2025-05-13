import React, {
  useEffect,
  useReducer,
  useRef,
  useState,
  ReactNode,
} from "react";
import Column from "./components/Column";
import { taskReducer } from "./context/TaskReducer";
import { Box, CssBaseline, useMediaQuery, useTheme } from "@mui/material";
import { DragDropContext, DropResult } from "@hello-pangea/dnd";
import Sidebar from "./components/Sidebar";
import Navbar from "./components/Navbar";
import NewTaskModal from "./components/NewTaskModal";
import OfflineBanner from "./components/OfflineBanner";
import axios from "./utils/axios";

export interface Task {
  id: number;
  title: string;
  status: "todo" | "inprogress" | "done";
}

interface MoveTaskPayload {
  id: number;
  sourceIndex: number;
  destinationIndex: number;
  sourceStatus: string;
  destinationStatus: string;
}

interface State {
  tasks: Task[];
}

type Status = Task["status"];

const shuffleTasks = (tasks: Task[]): Task[] => {
  const shuffled = [...tasks];
  for (let i = shuffled.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [shuffled[i], shuffled[j]] = [shuffled[j], shuffled[i]];
  }
  return shuffled;
};

export default function App(): ReactNode {
  const [state, dispatch] = useReducer(taskReducer, [], (): State => {
    const stored = localStorage.getItem("tasks");
    return stored ? { tasks: JSON.parse(stored) } : { tasks: [] };
  });

  const [isLoggedIn, setIsLoggedIn] = useState<boolean>(() => {
    return !!localStorage.getItem("token");
  });

  const loadData = async () => {
    const res = await axios.get("/todos?_limit=12");
    const data: any[] = res.data;

    const tasksWithStatus: Task[] = data.map((task) => ({
      ...task,
      status: task.completed
        ? "done"
        : task.id % 3 === 0
        ? "inprogress"
        : "todo",
    }));

    const completedTasks = tasksWithStatus.filter(
      (task) => task.status === "done"
    );
    const incompleteTasks = tasksWithStatus.filter(
      (task) => task.status !== "done"
    );

    const shuffledIncomplete = shuffleTasks(incompleteTasks);

    dispatch({
      type: "SET_TASKS",
      payload: [...completedTasks, ...shuffledIncomplete],
    });
  };
  useEffect(() => {
    localStorage.setItem("tasks", JSON.stringify(state.tasks));
  }, [state.tasks]);

  useEffect(() => {
    if (state.tasks.length === 0) {
      loadData();
    }
  }, [state.tasks.length]);

  const grouped = {
    todo: state.tasks.filter((t) => t.status === "todo"),
    inprogress: state.tasks.filter((t) => t.status === "inprogress"),
    done: state.tasks.filter((t) => t.status === "done"),
  };

  const handleDragEnd = (result: DropResult): void => {
    const { source, destination, draggableId } = result;
    if (!destination) return;

    const payload: MoveTaskPayload = {
      id: parseInt(draggableId),
      sourceIndex: source.index,
      destinationIndex: destination.index,
      sourceStatus: source.droppableId as string,
      destinationStatus: destination.droppableId as string,
    };

    dispatch({
      type: "MOVE_TASK",
      payload,
    });
  };

  const theme = useTheme();
  const isSmallScreen = useMediaQuery(theme.breakpoints.down("md"));
  const [open, setOpen] = useState<boolean>(!isSmallScreen);

  useEffect(() => {
    setOpen(!isSmallScreen);
  }, [isSmallScreen]);

  const toggleDrawer = () => {
    setOpen((prevState) => !prevState);
  };

  const [modalOpen, setModalOpen] = useState<boolean>(false);
  const newTaskStatusRef = useRef<Status | null>(null);

  const handleOpenModal = (status: Status): void => {
    newTaskStatusRef.current = status;
    setModalOpen(true);
  };

  const handleCreateTask = async (taskData: { title: string }) => {
    const newTask: Task = {
      id: Date.now(),
      title: taskData.title,
      status: newTaskStatusRef.current || "todo",
    };

    dispatch({ type: "ADD_TASK", payload: newTask });

    try {
      await axios.post("/todos", newTask);
    } catch (error) {
      console.error("Failed to create task:", error);
    }

    setModalOpen(false);
  };

  const handleProfileClick = async () => {
    if (isLoggedIn) return;
    try {
      localStorage.setItem("token", "fake-jwt-token");
      loadData();
      setIsLoggedIn(true);
    } catch (err) {
      console.error("Failed to fetch user profile:", err);
    }
  };

  return (
    <>
      <Sidebar
        open={open}
        toggleDrawer={toggleDrawer}
        onProfileClick={handleProfileClick}
      />
      <CssBaseline />
      <OfflineBanner />
      <Box sx={{ marginLeft: { md: "80px" } }}>
        <Navbar
          tasksLen={state.tasks.length}
          open={open}
          toggleDrawer={toggleDrawer}
        />
        <DragDropContext onDragEnd={handleDragEnd}>
          <Box
            sx={{
              display: "grid",
              gap: 3,
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
            <Column
              title="To Do"
              tasks={grouped.todo}
              droppableId="todo"
              onOpenNewTaskModal={handleOpenModal}
              status="todo"
              isLoggedIn={isLoggedIn}
            />
            <Column
              title="In Progress"
              tasks={grouped.inprogress}
              droppableId="inprogress"
              onOpenNewTaskModal={handleOpenModal}
              status="inprogress"
              isLoggedIn={isLoggedIn}
            />
            <Column
              title="Completed"
              tasks={grouped.done}
              droppableId="done"
              onOpenNewTaskModal={handleOpenModal}
              status="done"
              isLoggedIn={isLoggedIn}
            />
          </Box>
        </DragDropContext>
      </Box>
      <NewTaskModal
        open={modalOpen}
        onClose={() => setModalOpen(false)}
        onSubmit={handleCreateTask}
      />
    </>
  );
}
