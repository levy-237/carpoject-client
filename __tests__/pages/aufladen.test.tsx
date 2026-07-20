import "@testing-library/jest-dom";
import { render, screen } from "@testing-library/react";
import AufladenPage from "@/app/aufladen/page";

describe("Aufladen Page", () => {
  it("renders the aufladen page", () => {
    render(<AufladenPage />);

    const aufladenPage = screen.getByTestId("aufladen-page");

    expect(aufladenPage).toBeInTheDocument();

    const aufladenIntro = screen.getByTestId("aufladen-intro");
    expect(aufladenIntro).toBeInTheDocument();

    const aufladenMethods = screen.getByTestId("aufladen-methods");
    expect(aufladenMethods).toBeInTheDocument();

    const aufladenCosts = screen.getByTestId("aufladen-costs");
    expect(aufladenCosts).toBeInTheDocument();

    const aufladenChecklist = screen.getByTestId("aufladen-checklist");
    expect(aufladenChecklist).toBeInTheDocument();
  });
});
