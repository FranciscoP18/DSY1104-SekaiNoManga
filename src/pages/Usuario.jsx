import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

export default function Usuario() {
  const [email, setEmail] = useState('');
  const [pass, setPass] = useState('');
  const navigate = useNavigate();

  const submit = (e) => {
    e.preventDefault();
    const ok = /\S+@\S+\.\S+/.test(email) && pass.trim().length > 0;
    if (!ok) { alert('Email/contraseña inválidos'); return; }
    alert('Login simulado');
    navigate('/');
  };

  return (
    <section className="py-4">
      <div className="container" style={{ maxWidth: 480 }}>
        <h1 className="h4 mb-3">Iniciar sesión</h1>
        <form onSubmit={submit} className="vstack gap-3">
          <input
            className="form-control"
            placeholder="Correo"
            value={email}
            onChange={(e)=>setEmail(e.target.value)}
          />
          <input
            className="form-control"
            type="password"
            placeholder="Contraseña"
            value={pass}
            onChange={(e)=>setPass(e.target.value)}
          />
          <button className="btn btn-primary">Entrar</button>
        </form>
      </div>
    </section>
  );
}
