import { render, screen, fireEvent } from "@testing-library/react";
import React from "react";
import { MemoryRouter } from "react-router-dom";
import ProfileEdit from "../../../src/Pages/Profile/ProfileEdit";

describe("ProfileEdit", () => {
  const mockProps = {
    name: "John Doe",
    email: "john.doe@example.com",
    unityid: "johndoe123",
    studentid: "S123456",
    address: "123 Main St",
    role: "Student",
    skills: "React, Node.js",
    projects: "Project A, Project B",
    experience: "2 years in web development",
    phonenumber: "123-456-7890",
    availability: "8 Hours",
    gender: "Male",
    hours: "20",
  };

  it("renders ProfileEdit component with mock data", () => {
    render(
      <MemoryRouter>
        <ProfileEdit props={mockProps} />
      </MemoryRouter>
    );


    expect(screen.getByLabelText(/Name/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/Unityid/i)).toHaveValue(mockProps.unityid);
    expect(screen.getByLabelText(/Studentid/i)).toHaveValue(mockProps.studentid);
    expect(screen.getByLabelText(/Role/i)).toHaveValue(mockProps.role);
    expect(screen.getByLabelText(/Skills/i)).toHaveValue(mockProps.skills);
    expect(screen.getByLabelText(/Projects/i)).toHaveValue(mockProps.projects);
    expect(screen.getByLabelText(/Experience/i)).toHaveValue(mockProps.experience);
    expect(screen.getByLabelText(/Phone number/i)).toHaveValue(mockProps.phonenumber);
    expect(screen.getByLabelText(/Gender/i)).toHaveValue(mockProps.gender);
  });

  it("should allow input to be edited", () => {
    render(
      <MemoryRouter>
        <ProfileEdit props={mockProps} />
      </MemoryRouter>
    );


    fireEvent.change(screen.getByLabelText(/Name/i), { target: { value: "Jane Doe" } });
    fireEvent.change(screen.getByLabelText(/Role/i), { target: { value: "Student" } });


    expect(screen.getByLabelText(/Name/i)).toHaveValue("Jane Doe");
    expect(screen.getByLabelText(/Role/i)).toHaveValue("Student");
  });

  it("should display a submit button", () => {
    render(
      <MemoryRouter>
        <ProfileEdit props={mockProps} />
      </MemoryRouter>
    );
  

    expect(screen.getByRole("button", { name: /save profile/i })).toBeInTheDocument();
  });
  it("should display the correct availability options", () => {
    render(
      <MemoryRouter>
        <ProfileEdit props={mockProps} />
      </MemoryRouter>
    );
  

    const availabilityDropdown = screen.getByLabelText(/Availability/i);
    

    expect(availabilityDropdown).toHaveTextContent("8 Hours");
  });
  
  
});
