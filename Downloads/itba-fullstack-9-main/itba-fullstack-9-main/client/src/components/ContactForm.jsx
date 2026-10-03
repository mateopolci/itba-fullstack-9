import { useState } from "react";
import "./ContactForm.css";

function ContactForm({ onSubmit }) {
  const [formulario, setFormulario] = useState({
    nombre: "",
    email: "",
    mensaje: "",
  });

  const [mensajeExito, setMensajeExito] = useState("");

  const handleChange = (e) => {
    setFormulario({
      ...formulario,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    if (onSubmit) {
      onSubmit(formulario);
    }

    setMensajeExito(
      `¡Gracias ${formulario.nombre}! Tu mensaje fue enviado correctamente.`
    );

    setFormulario({
      nombre: "",
      email: "",
      mensaje: "",
    });
  };

  return (
    <section className="contacto">
      <div className="contacto-intro">
        <p className="eyebrow">Hermanos Jota</p>

        <h1>Contactanos</h1>

        <p>
          ¿Tenés alguna consulta sobre nuestros muebles?
          Escribinos y nuestro equipo se pondrá en contacto con vos.
        </p>
      </div>

      <form
        className="contacto-form"
        onSubmit={handleSubmit}>
        <div className="campo">
          <label htmlFor="nombre">
            Nombre
          </label>

          <input
            type="text"
            id="nombre"
            name="nombre"
            placeholder="Tu nombre"
            value={formulario.nombre}
            onChange={handleChange}
          />
        </div>

        <div className="campo">
          <label htmlFor="email">
            Email
          </label>

          <input
            type="email"
            id="email"
            name="email"
            placeholder="tu@email.com"
            value={formulario.email}
            onChange={handleChange}
          />
        </div>

        <div className="campo">
          <label htmlFor="mensaje">
            Mensaje
          </label>

          <textarea
            id="mensaje"
            name="mensaje"
            rows="6"
            placeholder="Escribí tu consulta..."
            value={formulario.mensaje}
            onChange={handleChange}
          />
        </div>

        <button type="submit">
          Enviar mensaje
        </button>

        {mensajeExito && (
          <p className="mensaje-exito">
            {mensajeExito}
          </p>
        )}
      </form>
    </section>
  );
}

export default ContactForm;