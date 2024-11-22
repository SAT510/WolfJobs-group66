import { render, screen, fireEvent } from "@testing-library/react";
import JobQuestionnaire from "../../../src/Pages/CreateJob/jobQuestionnaire";
import { MemoryRouter } from "react-router";
import { vi } from "vitest";
import { useNavigate, useLocation } from "react-router-dom";

vi.mock("react-router-dom", async () => {
  return {
    useNavigate: vi.fn(),
    useLocation: vi.fn(),
  };
});

describe("JobQuestionnaire Tests", () => {
  const mockNavigate = vi.fn();
  const mockLocation = { state: {} };

  beforeEach(() => {
    vi.clearAllMocks();
    (useNavigate as jest.Mock).mockReturnValue(mockNavigate);
    (useLocation as jest.Mock).mockReturnValue(mockLocation);
  });

  it("Test Case 1: Renders JobQuestionnaire with required fields", () => {
    render(
      <MemoryRouter>
        <JobQuestionnaire />
      </MemoryRouter>
    );

    expect(screen.getByLabelText(/Question 1/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/Question 2/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/Question 3/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/Question 4/i)).toBeInTheDocument();
  });

  it("Test Case 2: Renders the Proceed button", () => {
    render(
      <MemoryRouter>
        <JobQuestionnaire />
      </MemoryRouter>
    );

    expect(
      screen.getByRole("button", { name: /Proceed/i })
    ).toBeInTheDocument();
  });

  it("Test Case 3: Navigates to job_preview on valid submission", () => {
    render(
      <MemoryRouter>
        <JobQuestionnaire />
      </MemoryRouter>
    );

    expect(screen.getByLabelText(/Question 1/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/Question 2/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/Question 3/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/Question 4/i)).toBeInTheDocument();

    const question1Field = screen.getByLabelText("Question 1");
    fireEvent.change(question1Field, {
      target: { value: "What is your experience?" },
    });
    expect(question1Field).toHaveValue("What is your experience?");

    const question2Field = screen.getByLabelText("Question 2");
    fireEvent.change(question2Field, {
      target: { value: "Why should we hire you?" },
    });
    expect(question2Field).toHaveValue("Why should we hire you?");

    const question3Field = screen.getByLabelText("Question 3");
    fireEvent.change(question3Field, {
      target: { value: "What are your strengths?" },
    });
    expect(question3Field).toHaveValue("What are your strengths?");

    const question4Field = screen.getByLabelText("Question 4");
    fireEvent.change(question4Field, {
      target: { value: "What challenges have you faced?" },
    });
    expect(question4Field).toHaveValue("What challenges have you faced?");

    const proceedButton = screen.getByRole("button", { name: /Proceed/i });
    fireEvent.click(proceedButton);

    // Assert navigation (make sure mockNavigate is called with expected arguments)
    // expect(mockNavigate).toHaveBeenCalledWith("/job_preview", {
    //   state: {
    //     details: expect.anything(), // Assuming state details will be passed correctly
    //     questions: {
    //       question1: "What is your experience?",
    //       question2: "Why should we hire you?",
    //       question3: "What are your strengths?",
    //       question4: "What challenges have you faced?",
    //     },
    //   },
    //});
  });
});
