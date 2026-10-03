import "./styles.css";

function Footer({
  empresa = "Mueblería Hermanos Jota",
  direccion = "Av. Belgrano 1234, CABA, Argentina",
  telefono = "(011) 4567-8900",
  email = "info@hermanosjota.com",
}) {
  return (
    <footer className="footer">
      <div className="footer-info">
        <h3>{empresa}</h3>

        <p>
          Diseño y fabricación de muebles con más de 30 años de tradición
          artesanal.
        </p>

        <p>
          {direccion} | Tel: {telefono} | {" "}
          <a href={`mailto:${email}`}>{email}</a>
        </p>
      </div>

      <div className="footer-copy">
        <p>© 2026 Mueblería Hermanos Jota. Todos los derechos reservados.</p>
      </div>
    </footer>
  );
}

export default Footer;