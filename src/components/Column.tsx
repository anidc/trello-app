import React from "react";
import { Box, IconButton, Paper, Typography } from "@mui/material";
import { Draggable, Droppable } from "@hello-pangea/dnd";
import TaskCard from "./TaskCard";
import AddIcon from "@mui/icons-material/Add";

type Task = {
  id: number;
  title: string;
  status: string;
};

type Status = "todo" | "inprogress" | "done";

interface ColumnProps {
  title: string;
  tasks: Task[];
  droppableId: string;
  onOpenNewTaskModal: (status: Status) => void;
  status: Status;
}
const getDotColor = (title: string): string => {
  switch (title.toLowerCase()) {
    case "to do":
      return "#4F46E5";
    case "in progress":
      return "#F59E0B";
    case "completed":
      return "#22C55E";
    default:
      return "#4F46E5";
  }
};

const Column: React.FC<ColumnProps> = ({
  title,
  tasks,
  droppableId,
  onOpenNewTaskModal,
  status,
}) => {
  return (
    <Paper
      sx={{
        p: { xs: "12px", md: 2 },
        height: "max-content",
        minHeight: "250px",
        backgroundColor: "#F8FAFC",
        border: "1px solid #E2E8F0",
        borderRadius: 8,
        "@media screen and (min-width: 960px)": {
          maxWidth: 416,
        },
        "@media screen and (min-width: 1500px)": {
          minWidth: 416,
        },
      }}
    >
      <Box
        sx={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          mb: 2,
        }}
      >
        <Typography variant="h6" sx={{ fontWeight: 900 }}>
          <span style={{ color: getDotColor(title) }}>•</span> {title}{" "}
          <span style={{ color: "#94A3B8" }}>({tasks.length})</span>
        </Typography>
        <IconButton
          sx={{
            border: "1px solid #E2E8F0",
            borderRadius: "50%",
          }}
          aria-label="add task"
          onClick={() => onOpenNewTaskModal(status)}
        >
          <AddIcon />
        </IconButton>
      </Box>
      <Droppable droppableId={droppableId}>
        {(provided) => (
          <Box
            ref={provided.innerRef}
            {...provided.droppableProps}
            sx={{
              display: "flex",
              flexDirection: "column",
            }}
          >
            {tasks.map((task, index) => (
              <Draggable
                key={task.id}
                draggableId={String(task.id)}
                index={index}
              >
                {(provided, snapshot) => (
                  <div
                    ref={provided.innerRef}
                    {...provided.draggableProps}
                    {...provided.dragHandleProps}
                    style={{
                      opacity: snapshot.isDragging ? 0.8 : 1,
                      transition: "opacity 0.3s ease",
                    }}
                  >
                    <TaskCard
                      key={task.id}
                      task={task}
                      index={index}
                      isLast={index === tasks.length - 1}
                    />
                  </div>
                )}
              </Draggable>
            ))}
            {provided.placeholder}
          </Box>
        )}
      </Droppable>
    </Paper>
  );
};

export default Column;
