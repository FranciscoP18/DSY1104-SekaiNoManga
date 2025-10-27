import React from "react";
import { screen, fireEvent } from "@testing-library/react";
import ProductCard from "./ProductCard";
import { renderWithRouter } from "../helpers/render"; 

describe("ProductCard", () => {
  it("muestra título y precio normalizados", () => {
    const product = { id: 7, titulo: "Chainsaw Man", precio: 9990, image: "csm.png" };
    renderWithRouter(<ProductCard product={product} />); 
    expect(screen.getByText(/Chainsaw Man/)).toBeTruthy();
    expect(screen.getByText(/[\$\d\.,]/)).toBeTruthy();
  });

  it("fallbacks: sin titulo → 'Producto', precio 0", () => {
    renderWithRouter(<ProductCard product={{ id: 1 }} />);
    expect(screen.getByText("Producto")).toBeTruthy();
    expect(screen.getByText(/[\$\d\.,]/)).toBeTruthy();
  });

  it("click Agregar llama onAdd con objeto normalizado", () => {
    const onAdd = jasmine.createSpy("onAdd");
    const product = { id: 3, title: "One Piece", price: 12000, image: "op.png" };
    renderWithRouter(<ProductCard product={product} onAdd={onAdd} />);
    fireEvent.click(screen.getByRole("button", { name: /Agregar/i }));
    expect(onAdd).toHaveBeenCalled();
    const arg = onAdd.calls.mostRecent().args[0];
    expect(arg).toEqual(jasmine.objectContaining({ id: 3, title: "One Piece", price: 12000 }));
  });
});
