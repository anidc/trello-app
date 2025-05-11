import React from "react";
import { Box, IconButton, Paper, Typography } from "@mui/material";
import { Droppable } from "@hello-pangea/dnd";
import TaskCard from "./TaskCard";
import AddIcon from "@mui/icons-material/Add";

const getDotColor = (title) => {
  switch (title.toLowerCase()) {
    case "to do":
      return "#4F46E5";
    case "in progress":
      return "#F59E0B";
    case "done":
      return "#22C55E";
    default:
      return "#4F46E5";
  }
};
const Column = ({ title, tasks, droppableId }) => {
  return (
    <Paper
      sx={{
        p: 2,
        height: "max-content",
        minHeight: "400px",
        backgroundColor: "#F8FAFC",
        border: "1px solid #E2E8F0",
        borderRadius: 8,
        "@media screen and (min-width: 960px)": {
          maxWidth: 416,
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
          <span
            style={{
              color: getDotColor(title),
              marginRight: "5px",
            }}
          >
            •
          </span>{" "}
          {title} <span style={{ color: "#94A3B8" }}>({tasks.length})</span>
        </Typography>
        <IconButton
          sx={{
            border: "1px solid #E2E8F0",
            borderRadius: "50%",
          }}
          aria-label="add task"
        >
          <AddIcon />
        </IconButton>
      </Box>
      <Droppable droppableId={droppableId}>
        {(provided) => (
          <Box
            ref={provided.innerRef}
            {...provided.droppableProps}
            sx={{ display: "flex", flexDirection: "column", gap: 2 }}
          >
            {tasks.map((task, index) => (
              <TaskCard key={task.id} task={task} index={index} />
            ))}
            {provided.placeholder}
          </Box>
        )}
      </Droppable>
    </Paper>
  );
};

export default Column;
