import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Button,
  TextField,
  MenuItem,
} from "@mui/material";
import { useForm, Controller } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";

const schema = yup.object({
  title: yup.string().required("Title is required"),
});

const NewTaskModal = ({ open, onClose, onSubmit }) => {
  const {
    handleSubmit,
    control,
    reset,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(schema),
    defaultValues: {
      title: "",
    },
  });

  const submitForm = (data) => {
    onSubmit(data);
    reset();
    onClose();
  };

  return (
    <Dialog
      open={open}
      onClose={onClose}
      fullWidth
      sx={{
        "& .MuiPaper-root": {
          borderRadius: 4,
          padding: 3,
        },
      }}
    >
      <DialogTitle sx={{ fontWeight: 700, padding: 0 }}>
        Create New Task
      </DialogTitle>
      <DialogContent
        sx={{
          display: "flex",
          flexDirection: "column",
          gap: 21,
          padding: 0,
          "& .MuiFormControl-root": {
            marginTop: 2,
            marginBottom: 2,
          },
        }}
      >
        <Controller
          name="title"
          control={control}
          render={({ field }) => (
            <TextField
              {...field}
              label="Task Title"
              error={!!errors.title}
              helperText={errors.title?.message}
              fullWidth
            />
          )}
        />
      </DialogContent>
      <DialogActions sx={{ padding: 0 }}>
        <Button
          onClick={onClose}
          sx={{ borderRadius: 5, textTransform: "capitalize" }}
        >
          Cancel
        </Button>
        <Button
          onClick={handleSubmit(submitForm)}
          variant="contained"
          sx={{ borderRadius: 5, textTransform: "capitalize", boxShadow: 0 }}
        >
          Add Task
        </Button>
      </DialogActions>
    </Dialog>
  );
};
export default NewTaskModal;
