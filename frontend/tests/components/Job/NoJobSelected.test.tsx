// NoJobSelected.test.tsx
import { render, screen } from "@testing-library/react";
import NoJobSelected from "../../../src/components/Job/NoJobSelected";
import { MemoryRouter } from "react-router";

describe("NoJobSelected Tests", () => {
  // Test Case 1: Renders the "Nothing to show!" message
  it("Test Case 1: Renders 'Nothing to show!' message", () => {
    render(
      <MemoryRouter>
        <NoJobSelected />
      </MemoryRouter>
    );

    expect(screen.getByText(/Nothing to show!/i)).toBeInTheDocument();
  });

  it("Test Case 2: Renders 'Select a job for more details' message", () => {
    render(
      <MemoryRouter>
        <NoJobSelected />
      </MemoryRouter>
    );

    expect(
      screen.getByText(/Select a job for more details/i)
    ).toBeInTheDocument();
  });

  it("Test Case 3: Renders the image correctly", () => {
    render(
      <MemoryRouter>
        <NoJobSelected />
      </MemoryRouter>
    );

    const image = screen.getByRole("img");
    expect(image).toBeInTheDocument();
    expect(image).toHaveAttribute("src", "images/eva_slash-outline.svg");
  });
});
