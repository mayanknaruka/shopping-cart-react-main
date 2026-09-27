import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { describe, it, expect, vi, beforeEach } from "vitest";
import {
  MemoryRouter,
  createMemoryRouter,
  RouterProvider,
} from "react-router-dom";
import routes from "../components/Routes";
import Navbar from "../components/Navbar";

const mockProducts = [
  {
    id: 2,
    title: "Mens Casual Slim Fit",
    price: 22.3,
    category: "men's clothing",
    image: "https://fakestoreapi.com/img/mock.jpg",
  },
];

beforeEach(() => {
  vi.stubGlobal(
    "fetch",
    vi.fn(() =>
      Promise.resolve({
        json: () => Promise.resolve(mockProducts),
      }),
    ),
  );
});

describe("Navbar Component", () => {
  it("renders store branding and navigation links", () => {
    render(
      <MemoryRouter>
        <Navbar cart={[]} />
      </MemoryRouter>,
    );

    expect(screen.getByText(/Super/i)).toBeInTheDocument();
    expect(screen.getByRole("link", { name: /home/i })).toBeInTheDocument();
    expect(screen.getByRole("link", { name: /shop/i })).toBeInTheDocument();
  });

  it("calculates and displays total cart items badge correctly", () => {
    const mockCart = [
      { id: 2, quantity: 3 },
      { id: 3, quantity: 2 },
    ];

    render(
      <MemoryRouter>
        <Navbar cart={mockCart} />
      </MemoryRouter>,
    );
    expect(screen.getByText("5")).toBeInTheDocument();
  });
});

describe("Shopping Flow Integration", () => {
  it("allows user to increment quantity and add item to cart", async () => {
    const user = userEvent.setup();
    const router = createMemoryRouter(routes, { initialEntries: ["/shop"] });

    render(<RouterProvider router={router} />);
    const productTitle = await screen.findByText("Mens Casual Slim Fit");
    expect(productTitle).toBeInTheDocument();
    const plusBtn = screen.getByRole("button", { name: "+" });
    await user.click(plusBtn);

    const input = screen.getByRole("spinbutton");
    expect(input.value).toBe("2");

    const addBtn = screen.getByRole("button", { name: /add to cart/i });
    await user.click(addBtn);

    expect(screen.getByText("2")).toBeInTheDocument();
  });
});
