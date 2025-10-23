import React from "react";
import { renderWithCart } from "../helpers/render";

beforeEach(() => {
  global.fetch = jasmine.createSpy("fetch").and.returnValue(
    Promise.resolve({ ok: true, json: () => Promise.resolve([]) })
  );
});
afterEach(() => { delete global.fetch; });

import Home from "./Home";
import Catalogo from "./Catalogo";
import Carro from "./Carro";
import Producto from "./Producto";
import Ofertas from "./Ofertas";
import Quienes from "./Quienes";
import Terminos from "./Terminos";
import Usuario from "./Usuario";
import Vendidos from "./Vendidos";

describe("Pages smoke", () => {
  it("Home",     () => { renderWithCart(<Home />);     expect(document.body).toBeTruthy(); });
  it("Catalogo", () => { renderWithCart(<Catalogo />); expect(document.body).toBeTruthy(); });
  it("Carro",    () => { renderWithCart(<Carro />);    expect(document.body).toBeTruthy(); });
  it("Producto", () => { renderWithCart(<Producto />); expect(document.body).toBeTruthy(); });
  it("Ofertas",  () => { renderWithCart(<Ofertas />);  expect(document.body).toBeTruthy(); });
  it("Quienes",  () => { renderWithCart(<Quienes />);  expect(document.body).toBeTruthy(); });
  it("Terminos", () => { renderWithCart(<Terminos />); expect(document.body).toBeTruthy(); });
  it("Usuario",  () => { renderWithCart(<Usuario />);  expect(document.body).toBeTruthy(); });
  it("Vendidos", () => { renderWithCart(<Vendidos />); expect(document.body).toBeTruthy(); });
});
