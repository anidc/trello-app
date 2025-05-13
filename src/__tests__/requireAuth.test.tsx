import { MemoryRouter, Routes, Route } from "react-router-dom";
import { render, screen } from "@testing-library/react";
import RequireAuth from "../components/RequireAuth";

const Secret = () => <h1>JustATest</h1>;
const Nope = () => <h1>Nope</h1>;

const renderGuard = () =>
  render(
    <MemoryRouter initialEntries={["/secret"]}>
      <Routes>
        <Route
          path="/secret"
          element={
            <RequireAuth>
              <Secret />
            </RequireAuth>
          }
        />
        <Route path="/unauthorized" element={<Nope />} />
      </Routes>
    </MemoryRouter>
  );

describe("<RequireAuth />", () => {
  afterEach(() => localStorage.clear());

  it("redirects when token not present", () => {
    renderGuard();
    expect(screen.queryByText("JustATest")).not.toBeInTheDocument();
    expect(screen.getByText("Nope")).toBeInTheDocument();
  });

  it("renders children when token exists", () => {
    localStorage.setItem("token", "abc123");
    renderGuard();
    expect(screen.getByText("JustATest")).toBeInTheDocument();
  });
});
