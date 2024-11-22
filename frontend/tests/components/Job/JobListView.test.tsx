import { render, screen } from "@testing-library/react";
import React from "react";
import JobListView from "../../../src/components/Job/JobListView";
import { MemoryRouter } from "react-router-dom";

describe("JobListView", () => {
  it("renders JobListView", () => {
    render(
      <MemoryRouter>
        <JobListView JobList={{ _id: 1 }} title="All jobs" />
      </MemoryRouter>
    );
  });
  it('renders the default title when no title is provided', () => {
    const jobsList = [
      { _id: '1', name: 'Software Engineer' },
      { _id: '2', name: 'Data Analyst' },
    ];

    render(
      <MemoryRouter>
        <JobListView jobsList={jobsList} />
      </MemoryRouter>
    );

    expect(screen.getByText('All jobs')).toBeInTheDocument();
  });


  it('renders nothing if the jobs list is empty', () => {
    render(
      <MemoryRouter>
        <JobListView jobsList={[]} title="Available Jobs" />
      </MemoryRouter>
    );


    expect(screen.queryByText('Software Engineer')).toBeNull();
    expect(screen.queryByText('Data Analyst')).toBeNull();
  });
  
});
