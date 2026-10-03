import ProductCard from "./ProductCard";
import "./ProductList.css";

function ProductList({
  productos,
  onSelect,
  busqueda = "",
  onBuscar,}) {
  return (
    <section

      className="productos-seccion"
      aria-labelledby="titulo-productos" >
      <p className="eyebrow">
        Nuestra colección
      </p>

      <h1 id="titulo-productos">
        Productos
      </h1>

        
      <div className="buscador-seccion">
        <label htmlFor="buscador">
         Buscar productos
        </label>

        <input
         type="search"
          id="buscador"
          placeholder="Buscar por nombre, descripción o material..."
          value={busqueda}
          onChange={onBuscar}/>
      </div>

      {productos.length === 0 ? (
        <p className="sin-resultados">
          No encontramos productos que coincidan con tu búsqueda.
        </p>) : (

        <div className="productos-grid" role="list">
          {productos.map((producto) => (
            <ProductCard
              key={producto.id}
              producto={producto}
              onSelect={onSelect}
            />))}
        </div>)
      }
    </section>
  );
}

export default ProductList;
