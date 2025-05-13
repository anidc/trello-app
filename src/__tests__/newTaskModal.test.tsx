import React from "react";
import { render, screen, waitFor } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import NewTaskModal from "../components/NewTaskModal";

function renderDialog() {
  const onSubmit = jest.fn();
  const onClose = jest.fn();
  render(<NewTaskModal open onSubmit={onSubmit} onClose={onClose} />);
  return { onSubmit, onClose };
}

describe("<NewTaskModal />", () => {
  it("submits valid data and resets", async () => {
    const { onSubmit, onClose } = renderDialog();
    const user = userEvent.setup();

    const input = await screen.findByRole("textbox", { name: /task title/i });
    await user.type(input, "Buy milk");

    expect(input).toHaveValue("Buy milk");

    await user.click(screen.getByRole("button", { name: /add task/i }));

    await waitFor(() => expect(onSubmit).toHaveBeenCalled());
    expect(onClose).toHaveBeenCalled();
  });

  it("requires title field", async () => {
    const { onSubmit } = renderDialog();
    const user = userEvent.setup();

    await user.click(screen.getByRole("button", { name: /add task/i }));

    expect(await screen.findByText(/title is required/i)).toBeVisible();
    expect(onSubmit).not.toHaveBeenCalled();
  });
});
