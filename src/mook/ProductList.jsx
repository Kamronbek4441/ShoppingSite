import React, { useState } from 'react';
import products from './product';
import './ProductList.css';

function ProductList({ addToCart }) {
  const [selectedProduct, setSelectedProduct] = useState(null);

  return (
    <div className="product-list-container">
      <h1>Mahsulotlar</h1>

      <div className="product-list">
        {products.map((item) => (
          <div
            key={item.id}
            className="product-card"
            onClick={() => setSelectedProduct(item)}
          >
            <img src={item.image} alt={item.name} />
            <h3>{item.name}</h3>
            <p>{item.description}</p>
            <p>${item.price}</p>
            <button
              onClick={(e) => {
                e.stopPropagation();
                addToCart(item);
              }}
            >
              Savatga qo'shish
            </button>
          </div>
        ))}
      </div>

      {selectedProduct && (
        <div className="modal-overlay" onClick={() => setSelectedProduct(null)}>
          <div className="modal-content" onClick={(e) => e.stopPropagation()}>
            <button
              className="close-button"
              onClick={() => setSelectedProduct(null)}
            >
              ❌
            </button>
            <img src={selectedProduct.image} alt={selectedProduct.name} />
            <h2>{selectedProduct.name}</h2>
            <p>{selectedProduct.description}</p>
            <p>
              <strong>${selectedProduct.price}</strong>
            </p>
            <button onClick={() => addToCart(selectedProduct)}>
              Savatga qo'shish
            </button>
          </div>
        </div>
      )}
    </div>
  );
}

export default ProductList;
