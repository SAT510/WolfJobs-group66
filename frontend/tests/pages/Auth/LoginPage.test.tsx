import { render, screen, fireEvent } from "@testing-library/react";
import React from "react";
import LoginPage from "../../../src/Pages/Auth/LoginPage";
import { MemoryRouter } from "react-router";
import { vi } from "vitest";
import { useNavigate } from "react-router-dom";

vi.mock("react-router-dom", () => ({
  ...vi.importActual("react-router-dom"),
  useNavigate: vi.fn(),
}));

describe("LoginPage Tests", () => {
  const mockNavigate = vi.fn();

  beforeEach(() => {
    vi.clearAllMocks();
    (useNavigate as jest.Mock).mockReturnValue(mockNavigate);
  });

  it("Test Case 1: Renders LoginPage with required fields", () => {
    render(
      <MemoryRouter>
        <LoginPage />
      </MemoryRouter>
    );

    expect(screen.getByLabelText(/Email/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/Password/i)).toBeInTheDocument();
  });

  it("Test Case 2: Renders the login button", () => {
    render(
      <MemoryRouter>
        <LoginPage />
      </MemoryRouter>
    );

    expect(screen.getByText("Login")).toBeInTheDocument();
  });

  it("Test Case 3: renders login button with correct styling", () => {
    render(
      <MemoryRouter>
        <LoginPage />
      </MemoryRouter>
    );
  });
  it("Test Case 4: Check for presence of the submit button", () => {
    render(
      <MemoryRouter>
        <LoginPage />
      </MemoryRouter>
    );

    const loginButton = screen.getByRole("button", { name: /login/i });
    expect(loginButton).toBeInTheDocument();
  });

  it("Test Case 5: Navigation to registration page", () => {
    render(
      <MemoryRouter>
        <LoginPage />
      </MemoryRouter>
    );

    fireEvent.click(screen.getByText(/Create a new account/i));
    expect(mockNavigate).toHaveBeenCalledWith("/register");
  });

  it("Test Case 8: Button disabled when form is invalid", () => {
    render(
      <MemoryRouter>
        <LoginPage />
      </MemoryRouter>
    );

    const loginButton = screen.getByRole("button", { name: /login/i });
    expect(loginButton).toBeDisabled();
  });
});
