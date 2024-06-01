import { expect, test, describe, it } from 'vitest'
import userEvent from "@testing-library/user-event";
import { render, screen } from '@testing-library/react';
import App from './App';

test('Shuffles empty array', () => {
  const pokemons = [];
  App().shuffleCards();
  expect(pokemons.length).toBe(0)
})

describe("App component", () => {

  it("should show high score", () => {
    render(<App />);
    expect(screen.getByText("High Score")).toBeInTheDocument();
  });

  it("should show current score", () => {
    render(<App />);
    expect(screen.getByText("Score")).toBeInTheDocument();
  });

  it("Increments score on click", async () => {
    const user = userEvent.setup();

    render(<App />);
    setTimeout(async () => {
      const card = screen.getByRole("Card");

      await user.click(card);
      expect(screen.getByRole("heading", { name: "Score" }).nextSibling).toHaveTextContent("1");
    }, 1000);

  });

});

describe("App component", () => {
});

describe('App', () => {
  it('renders headline', () => {
    render(<App title="React" />);

    screen.debug();

    // check if App components renders headline
  });
});
