import React from "react";

function ProductList({ list, add }) {
  return (
    <div className="product-list">
      <div className="products-grid">
        {list?.map((item) => (
          <div key={item.id} className="product-card">
            <img src={item.image} alt={item.name} />
            <h3>{item.name}</h3>
            <p>{item.description}</p>
            <p className="price">${item.price}</p>
            <button onClick={() => add(item)}>Add to Cart</button>
          </div>
        ))}
      </div>
    </div>
  );
}

export default ProductList;
