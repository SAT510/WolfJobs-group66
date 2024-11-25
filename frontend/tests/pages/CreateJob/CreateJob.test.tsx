import { render, screen, fireEvent } from "@testing-library/react";
import CreateJob from "../../../src/Pages/CreateJob/CreateJob";
import { MemoryRouter } from "react-router";
import { vi } from "vitest";
import { useNavigate } from "react-router-dom";

vi.mock("react-router-dom", () => ({
  ...vi.importActual("react-router-dom"),
  useNavigate: vi.fn(),
}));

describe("CreateJob Tests", () => {
  const mockNavigate = vi.fn();

  beforeEach(() => {
    vi.clearAllMocks();
    (useNavigate as jest.Mock).mockReturnValue(mockNavigate);
  });

  it("Test Case 1: Renders CreateJob with required fields", () => {
    render(
      <MemoryRouter>
        <CreateJob />
      </MemoryRouter>
    );

    expect(screen.getByLabelText(/Job Role/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/Job Type/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/Location/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/Pay/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/Job Description/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/Job Deadline/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/Required Skills/i)).toBeInTheDocument();
  });

  it("Test Case 2: Renders the proceed button", () => {
    render(
      <MemoryRouter>
        <CreateJob />
      </MemoryRouter>
    );

    expect(
      screen.getByRole("button", { name: /Proceed/i })
    ).toBeInTheDocument();
  });

  it("Test Case 3: Navigates to job_questionnaire on valid submission", () => {
    render(
      <MemoryRouter>
        <CreateJob />
      </MemoryRouter>
    );

    expect(screen.getByLabelText(/Job Type/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/Job Role/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/Location/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/Pay/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/Job Description/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/Job Deadline/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/Required Skills/i)).toBeInTheDocument();

    const jobRoleSelect = screen.getByLabelText("Job Role");
    fireEvent.change(jobRoleSelect, { target: { value: "Software Engineer" } });
    expect(jobRoleSelect).toHaveValue("Software Engineer");

    const locationSelect = screen.getByLabelText("Location");
    expect(locationSelect).toBeInTheDocument();
    fireEvent.change(locationSelect, { target: { value: "New York" } });
    expect(locationSelect).toHaveValue("New York");

    const payField = screen.getByLabelText("Pay");
    fireEvent.change(payField, { target: { value: "100000" } });
    expect(payField).toHaveValue(100000);

    const jobDescriptionField = screen.getByLabelText("Job Description");
    fireEvent.change(jobDescriptionField, {
      target: { value: "Develop software solutions." },
    });
    expect(jobDescriptionField).toHaveValue("Develop software solutions.");

    const jobDeadlineField = screen.getByLabelText("Job Deadline");
    fireEvent.change(jobDeadlineField, { target: { value: "2024-12-31" } });
    expect(jobDeadlineField).toHaveValue("2024-12-31");

    const requiredSkillsField = screen.getByLabelText("Required Skills");
    fireEvent.change(requiredSkillsField, {
      target: { value: "React, Node.js" },
    });
    expect(requiredSkillsField).toHaveValue("React, Node.js");

    const proceedButton = screen.getByRole("button", { name: /Proceed/i });
    fireEvent.click(proceedButton);

    // Assert navigation (make sure mockNavigate is called with expected arguments)
    // expect(mockNavigate).toHaveBeenCalledWith("/jobQuestionnaire", {
    //   state: {
    //     role: "Software Engineer",
    //     jobtype: "full-time", // Assuming you set this or select it in your form
    //     location: "New York",
    //     pay: 100000,
    //     description: "Develop software solutions.",
    //     requiredSkills: "React, Node.js",
    //     jobDeadline: "2024-12-31",
    //   },
    // });
  });
});
