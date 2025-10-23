import React from 'react';

export default function Terminos() {
  return (
    <>
      {/* BANNER ENVÍO  */}
      <div className="banner-envio text-center py-2">
        <h1 className="texto-animado m-0">🛻 ¡ENVÍO A TODO CHILE! 🛻</h1>
      </div>

      {/* BANNER LOGO */}
      <div className="banner-logo text-center py-3">
        <img
          src="/assets/img/logo_tienda.png"
          alt="Sekai no Manga"
          style={{ height: '150px' }}
        />
      </div>

      {/* CONTENIDO TÉRMINOS */}
      <main className="container py-4">
        <section id="terminos" className="content p-4 p-md-5 mb-5 bg-light rounded-3">
          <h1 className="mb-3">Términos y Condiciones</h1>
          <p className="text-muted mb-4">Última actualización: 08-09-2025</p>

          <h4>1. Aceptación</h4>
          <p>
            Al acceder y comprar en <strong>Sekai No Manga</strong> (en adelante, “la Tienda”),
            aceptas estos Términos y Condiciones. Si no estás de acuerdo, por favor no utilices el sitio.
          </p>

          <h4>2. Identificación del proveedor</h4>
          <ul>
            <li>
              <strong>Correo:</strong> <a href="mailto:sekainomanga@chile.com">sekainomanga@chile.com</a>
            </li>
            <li>
              <strong>WhatsApp:</strong> <a href="https://wa.me/56912345678" target="_blank" rel="noreferrer">+56 9 1234 5678</a>
            </li>
          </ul>

          <h4>3. Registro y cuenta</h4>
          <p>
            Para comprar puede que necesites una cuenta. Debes proporcionar datos veraces, mantener la
            confidencialidad de tu contraseña y notificarnos cualquier uso no autorizado.
          </p>

          <h4>4. Productos y disponibilidad</h4>
          <p>
            Vendemos <strong>mangas</strong>. La disponibilidad puede variar. Las imágenes son referenciales;
            colores o ediciones pueden presentar diferencias menores.
          </p>

          <h4>5. Precios y facturación</h4>
          <ul>
            <li>
              Los precios están expresados en <strong>CLP</strong> e incluye <strong>IVA</strong> según se indique en el carrito.
            </li>
            <li>
              Nos reservamos el derecho a corregir errores de precio antes del despacho. Si ocurre, te
              contactaremos para confirmar o anular con devolución completa.
            </li>
          </ul>

          <h4>6. Medios de pago</h4>
          <p>
            Aceptamos tarjetas de crédito/débito, transferencias, pago en efectivo contra entrega. Los pagos
            se procesan de forma segura a través de WebPay.
          </p>

          <h4>7. Despachos y retiros</h4>
          <ul>
            <li><strong>Despacho a domicilio:</strong> plazos estimados 7 días hábiles en Chile; zonas extremas pueden demorar más.</li>
            <li>Una vez entregado al carrier, recibirás número de seguimiento.</li>
          </ul>

          <h4>8. Cambios, devoluciones y garantías</h4>
          <ul>
            <li>
              <strong>Producto dañado o con falla de fábrica:</strong> notifícalo dentro de 10 días corridos
              desde la recepción con fotos y número de pedido. Aplicaremos cambio, reparación o devolución
              conforme a la normativa de consumo.
            </li>
            <li>
              <strong>Retracto:</strong> si compras por internet, podrás ejercer tu derecho de retracto dentro de
              <em> 10 días corridos </em> desde la recepción, siempre que el producto esté <em>nuevo</em>, sellado y en
              condiciones de reventa. Gastos de envío de vuelta son a cargo del cliente, salvo error nuestro.
            </li>
            <li>
              <strong>Productos de preventa o importación especial:</strong> podrían no admitir retracto una vez
              cursada la orden al proveedor. Se indicará claramente antes de pagar.
            </li>
          </ul>

          <h4>9. Preventas</h4>
          <p>
            Las fechas de lanzamiento son referenciales y dependen del editor/distribuidor. Cualquier retraso será
            informado y podrás optar por esperar, cambiar por crédito en tienda o solicitar devolución.
          </p>

          <h4>10. Propiedad intelectual</h4>
          <p>
            Todo el contenido del sitio (logos, textos, fotos) es de la Tienda o de sus titulares y está protegido por
            leyes de propiedad intelectual. Queda prohibido su uso no autorizado.
          </p>

          <h4>11. Uso aceptable</h4>
          <p className="mb-1">No puedes:</p>
          <ol className="mb-3">
            <li>Vulnerar la seguridad del sitio;</li>
            <li>Realizar fraudes o devoluciones maliciosas;</li>
            <li>Revender sin autorización.</li>
          </ol>

          <h4>12. Privacidad y cookies</h4>
          <p>
            Tratamos tus datos conforme a nuestra <a href="/terminos" className="link">Política de Privacidad</a>.
            Usamos cookies para mejorar la experiencia; puedes gestionarlas en tu navegador.
          </p>

          <h4>13. Menores de edad</h4>
          <p>Si eres menor de 18 años, debes comprar con consentimiento de tu representante legal.</p>

          <h4>14. Fuerza mayor</h4>
          <p>
            No seremos responsables por incumplimientos derivados de eventos fuera de nuestro control (huelgas,
            desastres, interrupciones logísticas, etc.).
          </p>

          <h4>15. Modificaciones</h4>
          <p>
            Podemos actualizar estos términos en cualquier momento. Los cambios rigen desde su publicación.
            Revisa esta página periódicamente.
          </p>

          <h4>16. Ley aplicable y jurisdicción</h4>
          <p>
            Estos términos se rigen por las leyes de <strong>Chile</strong>. Cualquier disputa se someterá a los
            tribunales competentes de Santiago.
          </p>
        </section>
      </main>
    </>
  );
}
