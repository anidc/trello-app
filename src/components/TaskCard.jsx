import React from "react";
import { Box, LinearProgress, Paper, Typography } from "@mui/material";
import { Draggable } from "@hello-pangea/dnd";

const TaskCard = ({ task, index }) => {
  return (
    <Draggable draggableId={task.id.toString()} index={index}>
      {(provided) => (
        <Paper
          ref={provided.innerRef}
          {...provided.draggableProps}
          {...provided.dragHandleProps}
          elevation={2}
          sx={{
            p: "12px",
            backgroundColor: "white",
            borderRadius: 6,
            cursor: "grab",
          }}
        >
          <Typography
            sx={{
              fontWeight: "700",
              fontSize: "0.75rem",
              lineHeight: 1.33,
              color: "#4F46E5",
              backgroundColor: "#EEF2FF",
              borderRadius: "16px",
              width: "max-content",
              padding: "4px 8px",
              marginBottom: "12px",
            }}
          >
            Important
          </Typography>
          <Typography
            sx={{
              fontWeight: "700",
              fontSize: "1rem",
              lineHeight: 1.375,
              color: "#1E293B",
            }}
          >
            {task.title}
          </Typography>
          <Box
            sx={{
              display: "flex",
              justifyContent: "space-between",
              fontSize: "0.875rem",
              lineHeight: 1.42,
              marginTop: "1rem",
              marginBottom: "0.5rem",
            }}
          >
            <Typography sx={{ color: "#475569", fontWeight: 500 }}>
              Progress
            </Typography>
            <Typography
              sx={{
                color: "#1E293B",
                fontWeight: "700",
              }}
            >
              30%
            </Typography>
          </Box>
          <LinearProgress
            variant="determinate"
            value={30}
            sx={{ height: 6, borderRadius: 5 }}
          />
        </Paper>
      )}
    </Draggable>
  );
};

export default TaskCard;
