import React from "react";
import { Box, Paper, Typography } from "@mui/material";
import { Droppable } from "@hello-pangea/dnd";
import TaskCard from "./TaskCard";

const Column = ({ title, tasks, droppableId }) => {
  return (
    <Paper
      elevation={3}
      sx={{
        p: 2,
        minHeight: "400px",
        backgroundColor: "#f5f5f5",
        border: "1px solid #E2E8F0",
        borderRadius: 8,
      }}
    >
      <Typography variant="h6" mb={2} sx={{ fontWeight: 900 }}>
        {title} <span style={{ color: "#94A3B8" }}>({tasks.length})</span>
      </Typography>
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
