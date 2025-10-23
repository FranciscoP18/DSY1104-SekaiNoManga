import React from 'react';
import Catalogo from './Catalogo';
export default function Vendidos() {
    return <Catalogo filter={(p) => !!p.topSelling} />;
}