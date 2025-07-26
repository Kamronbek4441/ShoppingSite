import React, { useState } from "react";
import { Link } from 'react-router-dom';
import "./Navbar.css";

const Navbar = ({ cartCount, cartItems, onRemove, onUpdate }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [isCartOpen, setIsCartOpen] = useState(false);

  const toggleMenu = () => setIsOpen(!isOpen);
  const toggleCart = () => setIsCartOpen(!isCartOpen);

  const calculateTotal = () => {
    return cartItems.reduce((total, item) => total + (item.price * item.quantity), 0).toFixed(2);
  };

  return (
    <>
      <nav className="navbar">
        <div className="logo">MySite</div>

        <div className={`links ${isOpen ? "active" : ""}`}>
          <a href="/">Home</a>
          <a href="/about">About</a>
          <a href="/services">Services</a>
          <a href="/contact">Contact</a>
        </div>

        <div className="cart-icon" onClick={toggleCart}>
          🛒 <span className="cart-count">{cartCount}</span>
        </div>

        <div className="menu-icon" onClick={toggleMenu}>
          ☰
        </div>
      </nav>


      {isCartOpen && (
        <div className="cart-modal">
          <div className="cart-modal-content">
            <div className="cart-modal-header">
              <h2>Savat</h2>
              <button onClick={toggleCart} className="close-btn">&times;</button>
            </div>

            <div className="cart-items">
              {cartItems.length === 0 ? (
                <p>Savat bo'sh</p>
              ) : (
                <>
                  {cartItems.map((item) => (
                    <div key={item.id} className="cart-item">
                      <img src={item.image} alt={item.name} className="cart-item-image" />
                      <div className="cart-item-details">
                        <h4>{item.name}</h4>
                        <p>${item.price}</p>
                        <div className="quantity-controls">
                          <button onClick={() => onUpdate(item.id, item.quantity - 1)}>-</button>
                          <span>{item.quantity}</span>
                          <button onClick={() => onUpdate(item.id, item.quantity + 1)}>+</button>
                        </div>
                      </div>
                      <button
                        onClick={() => onRemove(item.id)}
                        className="remove-btn"
                      >
                        &times;
                      </button>
                    </div>
                  ))}
                  <div className="cart-total">
                    <strong>Jami:</strong> ${calculateTotal()}
                  </div>
                  {cartItems.length > 0 && (
                    <Link
                      to={`/rasmiylashtirish?product=${encodeURIComponent(cartItems[0].name)}&price=${cartItems[0].price}&quantity=${cartItems[0].quantity}&total=${calculateTotal()}`}
                    >
                      <button className="checkout-btn">Rasmiylashtirish</button>
                    </Link>
                  )}
                  {/* <button className="checkout-btn"><a href="/rasmiylashtirish">Rasmiylashtirish</a></button> */}
                </>
              )}
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default Navbar;