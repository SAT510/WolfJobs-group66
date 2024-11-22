import { render, screen } from "@testing-library/react";
import React from "react";
import { BrowserRouter as Router } from "react-router-dom";
import NavBarItem from "../../../src/components/Header/NavBarItem";
import { MemoryRouter } from "react-router-dom";
const renderNavBarItem = (link: string, text: string) => {
  render(
    <Router>
      <NavBarItem link={link} text={text} />
    </Router>
  );
};
describe("NavBarItem", () => {
  it("renders NavBarItem", () => {
    render(
      <MemoryRouter>
        <NavBarItem link={"/"} text="Home" />
      </MemoryRouter>
    );
    const headline = screen.getByText(/Home/i);
    expect(headline).toBeInTheDocument();
  });

  it("renders the correct text", () => {
    const link = "/dashboard";
    const text = "Dashboard";

    renderNavBarItem(link, text);

    // Check if the text is rendered correctly inside the Link
    const linkElement = screen.getByRole("link");
    expect(linkElement).toHaveTextContent(text);
  });

  it("applies hover styles correctly", () => {
    const link = "/dashboard";
    const text = "Dashboard";

    renderNavBarItem(link, text);

    const linkElement = screen.getByRole("link");

    expect(linkElement).toHaveClass("hover:text-slate-500");
  });
});
