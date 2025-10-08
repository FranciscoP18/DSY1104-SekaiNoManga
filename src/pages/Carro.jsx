import React from 'react';
import CartTable from '../components/CartTable';
import CartSummary from '../components/CartSummary';

export default function Carro() {
  return (
    <section className="py-4">
      <div className="container">
        <h1 className="h4 mb-3">Tu Carro</h1>
        <div className="row g-3">
          <div className="col-12 col-lg-8">
            <CartTable />
          </div>
          <div className="col-12 col-lg-4">
            <CartSummary />
          </div>
        </div>
      </div>
    </section>
  );
}
