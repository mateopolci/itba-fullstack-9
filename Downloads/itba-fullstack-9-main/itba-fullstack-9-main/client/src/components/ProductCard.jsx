import "./ProductCard.css";

function ProductCard({
  producto, onSelect, }) {
  return (
    <article className="card-producto">
      <img
        src={producto.imagen}
        alt={producto.nombre}
        loading="lazy"
      />

      <div className="card-info">
        <h3>{producto.nombre}</h3>

        <p>{producto.materiales}</p>

        <button
          className="btn-detalle"
          onClick={() => onSelect(producto)}>
          Ver detalle
        </button>
      </div>
    </article>
  );
}

export default ProductCard;
