import { render, screen, fireEvent, waitFor } from "@testing-library/react";
import React from "react";
import Explore from "../../../src/Pages/Explore/Explore";
import { MemoryRouter } from "react-router";
import axios from "axios";
import MockAdapter from "axios-mock-adapter";

const mock = new MockAdapter(axios);

describe("Explore", () => {
  beforeEach(() => {
    mock.reset();
  });

  test("Request for users by jobs", async () => {
    mock.onGet("http://localhost:8000/api/v1/users").reply(200, {
      jobs: [
        { _id: "1", title: "Job 1" },
        { _id: "2", title: "Job 2" },
      ],
    });
    <MemoryRouter>
      render(
      <Explore />
      );
    </MemoryRouter>;
  });

//   test("Request for users by jobs1", async () => {
//     mock.onGet("http://localhost:8000/api/v1/users").reply(200, {
//       jobs: [
//         { _id: "1", title: "Job 1" },
//         { _id: "3", title: "Job 3" },
//       ],
//     });
//     <MemoryRouter>
//       render(
//       <Explore />
//       );
//     </MemoryRouter>;
//   });

//   test("Request for applications", async () => {
//     // Mock successful API response for fetching applications
//     mock
//       .onGet("http://localhost:8000/api/v1/users/fetchapplications")
//       .reply(200, {
//         application: [{ _id: "1", jobid: "123", status: "applied" }],
//       });

//     <MemoryRouter>
//       render(
//       <Explore />
//       );
//     </MemoryRouter>;
//   });

//   test("Request for applications", async () => {
//     // Mock successful API response for fetching applications
//     mock
//       .onGet("http://localhost:8000/api/v1/users/fetchapplications")
//       .reply(200, {
//         application: [{ _id: "2", jobid: "321", status: "In Review" }],
//       });

//     <MemoryRouter>
//       render(
//       <Explore />
//       );
//     </MemoryRouter>;
//   });

//   test("Filter by location", async () => {
//     // Mock successful API response for filtering by location
//     mock.onGet("http://localhost:8000/api/v1/users").reply(200, {
//       application: [
//         {
//           _id: "1",
//           name: "Software engineer",
//           jobid: "123",
//           type: "full-time",
//           location: "Cary",
//           status: "open",
//         },
//         {
//           _id: "2",
//           name: "Data Analyst",
//           jobid: "547",
//           type: "part-time",
//           location: "Cary",
//           status: "open",
//         },
//       ],
//     });

//     // Render the Explore component within MemoryRouter
//     render(
//       <MemoryRouter>
//         <Explore />
//       </MemoryRouter>
//     );

//     // Locate and click the Filters button
//     const filtersButton = screen.getByText("Filters");
//     fireEvent.click(filtersButton);

//     // Locate and set the location filter input field
//     const filterLocationInput = screen.getByPlaceholderText("Enter location");
//     fireEvent.change(filterLocationInput, { target: { value: "Raleigh" } });

//     // Apply the filters by clicking "Apply Filters" button
//     const applyFiltersButton = screen.getByText("Apply Filters");
//     fireEvent.click(applyFiltersButton);

//     // Assertion to ensure only the filtered job (Raleigh) is displayed

//     expect(screen.queryByText("Software engineer")).not.toBeInTheDocument(); // Expect this job to not be present
//     expect(screen.queryByText("Data Analyst")).not.toBeInTheDocument(); // Expect this job to not be present
//   });
});
