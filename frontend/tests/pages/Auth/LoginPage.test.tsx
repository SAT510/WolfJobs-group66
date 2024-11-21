import { render, screen, fireEvent } from "@testing-library/react";
import React from "react";
import LoginPage from "../../../src/Pages/Auth/LoginPage";
import { MemoryRouter } from "react-router";
import { vi } from "vitest";
import { useNavigate } from "react-router-dom";

// Mock useNavigate for testing navigation functionality
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

  // Test Case 1: Renders LoginPage with required fields
  it("Test Case 1: Renders LoginPage with required fields", () => {
    render(
      <MemoryRouter>
        <LoginPage />
      </MemoryRouter>
    );

    expect(screen.getByLabelText(/Email Address/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/Password/i)).toBeInTheDocument();
  });

  // Test Case 2: Renders the login button
  it("Test Case 2: Renders the login button", () => {
    render(
      <MemoryRouter>
        <LoginPage />
      </MemoryRouter>
    );

    expect(screen.getByText("Login")).toBeInTheDocument();
  });

  // Test case 3:
  it("Test Case 3: renders login button with correct styling", () => {
    render(
      <MemoryRouter>
        <LoginPage />
      </MemoryRouter>
    );
  });
  // Test Case 4
  it("Test Case 4: Check for presence of the submit button", () => {
    render(
      <MemoryRouter>
        <LoginPage />
      </MemoryRouter>
    );

    // Check if the login button is present in the document
    const loginButton = screen.getByRole("button", { name: /login/i });
    expect(loginButton).toBeInTheDocument();
  });
});
