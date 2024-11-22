import { render, screen } from "@testing-library/react";
import React from "react";
import JobListTile from "../../../src/components/Job/JobListTile";
import { MemoryRouter } from "react-router";

describe("JobListTile", () => {
  it("renders JobListTile", () => {
    render(
      <MemoryRouter>
        <JobListTile
          data={{
            _id: 1,
            managerAffilication: "nc-state-dining",
            pay: "100?",
            status: "closed",
          }}
        />
      </MemoryRouter>
    );
    // const headline = screen.getByText(/Hello/i);
    // expect(headline).toBeInTheDocument();
  });
  it("renders the correct affiliation tag", () => {
    render(
      <MemoryRouter>
        <JobListTile
          data={{
            _id: 1,
            managerAffilication: "nc-state-dining",
            pay: "100",
            status: "open",
          }}
        />
      </MemoryRouter>
    );

    expect(screen.getByText(/nc state dining/i)).toBeInTheDocument();
  });

  it("renders 'No Affiliation Information' if affiliation is not provided", () => {
    render(
      <MemoryRouter>
        <JobListTile
          data={{
            _id: 1,
            managerAffilication: "",
            pay: "100",
            status: "open",
          }}
        />
      </MemoryRouter>
    );

    expect(screen.getByText(/No Affiliation Information/i)).toBeInTheDocument();
  });

 
});
