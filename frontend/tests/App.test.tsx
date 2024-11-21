import { render, screen } from "@testing-library/react";
import React from "react";
import App from "../src/App";
import { MemoryRouter } from "react-router-dom";

describe("App", () => {
  it("renders App", () => {
    render(
      <MemoryRouter>
        <App />
      </MemoryRouter>
    );
  });

  it("renders App component without crashing", () => {
    render(
      <MemoryRouter>
        <App />
      </MemoryRouter>
    );
  });

  it("renders Dashboard on '/dashboard' route", () => {
    render(
      <MemoryRouter initialEntries={["/dashboard"]}>
        <App />
      </MemoryRouter>
    );
  });

  it("renders Explore page on '/explore' route", () => {
    render(
      <MemoryRouter initialEntries={["/explore"]}>
        <App />
      </MemoryRouter>
    );
  });

  it("renders CreateJob page on '/createjob' route", () => {
    render(
      <MemoryRouter initialEntries={["/createjob"]}>
        <App />
      </MemoryRouter>
    );
  });

  it("renders Error 404 on invalid route", () => {
    render(
      <MemoryRouter initialEntries={["/some/invalid/route"]}>
        <App />
      </MemoryRouter>
    );
  });

  it("renders Profile page on '/profile' route", () => {
    render(
      <MemoryRouter initialEntries={["/profile"]}>
        <App />
      </MemoryRouter>
    );
  });

  it("renders Notifications page on '/notifications' route", () => {
    render(
      <MemoryRouter initialEntries={["/notifications"]}>
        <App />
      </MemoryRouter>
    );
  });
});
