import React from "react";
import { screen } from "@testing-library/react";
import { renderWithRouter } from "../helpers/render";
import ProductCard from "./ProductCard";

describe("ProductCard - ramas", () => {
  it("sin id: renderiza sin romper (Link puede no estar)", () => {
    renderWithRouter(<ProductCard product={{ title: "Sin ID", price: 1234 }} />);
    expect(screen.getByText(/Sin ID|Producto/)).toBeTruthy();
  });

  it("sin image: muestra precio y alguna imagen (placeholder)", () => {
    renderWithRouter(<ProductCard product={{ id: 9, title: "Y", price: 999 }} />);
    expect(screen.getByText(/[\$\d\.,]/)).toBeTruthy();
    expect(screen.getAllByRole("img").length).toBeGreaterThan(0);
  });
});
