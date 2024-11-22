import { render } from "@testing-library/react";
import React from "react";
import { MemoryRouter } from "react-router-dom";
import Resume from "../../../src/Pages/Resume/Resume";
import { useUserStore } from "../../../src/store/UserStore";

describe("Resume", () => {
  it("renders Resume", () => {
    render(
      <MemoryRouter>
        <Resume />
      </MemoryRouter>
    );
  });
});
