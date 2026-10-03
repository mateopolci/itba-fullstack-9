import "./App.css";

function ProductDetail({
  producto,
  onClose,
}) {
  if (!producto) {
    return null;
  }

  return (
    <section className="product-detail">
      
      <button
        className="btn-volver"
        onClick={onClose} >
        ← Volver
      </button>

      <div className="detalle-contenido">

        <img
          src={producto.imagen}
          alt={producto.nombre}
        />

        <div className="detalle-info">
          <p className="eyebrow">
            Colección Hermanos Jota
          </p>

          <h1>{producto.nombre}</h1>

          <p>
            {producto.descripcion}
          </p>

          <p>
            <strong>Materiales:</strong>{" "}
            {producto.materiales}
          </p>

          <button className="btn-detalle">
            Agregar al carrito
          </button>

        </div>

      </div>

    </section>
  );
}

export default ProductDetail;