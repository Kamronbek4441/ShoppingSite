import React, { useState, useEffect } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Navbar from "./components/navbar/Navbar";
import Home from "./pages/home/Home";
import BuyurtmaBerish from "./pages/buyurtmaBerish/BuyurtmaBerish";
import ProductList from "./mook/ProductList";
import About from "./pages/About/About";
import Services from "./pages/services/Services";
import Contact from "./pages/concat/Caontact";
import Rasmiylashtirish from "./pages/rasmiylashtirish/Rasmiylashtirish";
import "./App.css";

function App() {
  const [isLoggedIn, setIsLoggedIn] = useState(true);

  const [cartItems, setCartItems] = useState(() => {
    const savedCart = localStorage.getItem("cart");
    return savedCart ? JSON.parse(savedCart) : [];
  });

  useEffect(() => {
    localStorage.setItem("cart", JSON.stringify(cartItems));
  }, [cartItems]);

  const addToCart = (product) => {
    const existing = cartItems.find((item) => item.id === product.id);
    if (existing) {
      setCartItems(
        cartItems.map((item) =>
          item.id === product.id
            ? { ...item, quantity: item.quantity + 1 }
            : item
        )
      );
    } else {
      setCartItems([...cartItems, { ...product, quantity: 1 }]);
    }
  };

  const removeFromCart = (id) => {
    setCartItems(cartItems.filter((item) => item.id !== id));
  };

  const updateQuantity = (id, newQty) => {
    if (newQty <= 0) {
      removeFromCart(id);
    } else {
      setCartItems(
        cartItems.map((item) =>
          item.id === id ? { ...item, quantity: newQty } : item
        )
      );
    }
  };

  const handleLogout = () => {
    setIsLoggedIn(false);
    localStorage.removeItem("cart");
    console.log("Tizimdan chiqildi.");
  };

  const totalItems = cartItems.reduce((sum, item) => sum + item.quantity, 0);

  return (
    <div className="app">
      <Router>
        {isLoggedIn ? (
          <>
            <Navbar
              cartCount={totalItems}
              cartItems={cartItems}
              onRemove={removeFromCart}
              onUpdate={updateQuantity}
            />
            <Routes>
              <Route
                path="/"
                element={
                  <>
                    <Home />
                    <ProductList addToCart={addToCart} />
                  </>
                }
              />
              <Route
                path="/buyurtma"
                element={
                  <BuyurtmaBerish
                    addToCart={addToCart}
                    onLogout={handleLogout}
                  />
                }
              />
              <Route path="/about" element={<About />} />
              <Route path="/services" element={<Services />} />
              <Route path="/contact" element={<Contact />} />
              <Route
                path="/rasmiylashtirish"
                element={
                  <Rasmiylashtirish
                    cartItems={cartItems}
                    setCartItems={setCartItems}
                  />
                }
              />
            </Routes>
          </>
        ) : (
          <div style={{ textAlign: "center", marginTop: "50px" }}>
            <h2>Iltimos, tizimga kiring</h2>
          </div>
        )}
      </Router>
    </div>
  );
}

export default App;


// import React, { useState, useEffect } from "react";
// import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
// import Navbar from "./components/navbar/Navbar";
// import Home from "./pages/home/Home";
// import BuyurtmaBerish from "./pages/buyurtmaBerish/BuyurtmaBerish";
// import ProductList from "./mook/ProductList";
// import About from "./pages/About/About";
// import Services from "./pages/services/Services";
// import Contact from "./pages/concat/Caontact";
// import Rasmiylashtirish from "./pages/rasmiylashtirish/Rasmiylashtirish";
// import "./App.css";

// function App() {
//   const [isLoggedIn, setIsLoggedIn] = useState(true);

//   const [cartItems, setCartItems] = useState(() => {
//     const savedCart = localStorage.getItem("cart");
//     return savedCart ? JSON.parse(savedCart) : [];
//   });

//   useEffect(() => {
//     localStorage.setItem("cart", JSON.stringify(cartItems));
//   }, [cartItems]);

//   const addToCart = (product) => {
//     const existing = cartItems.find((item) => item.id === product.id);
//     if (existing) {
//       setCartItems(
//         cartItems.map((item) =>
//           item.id === product.id
//             ? { ...item, quantity: item.quantity + 1 }
//             : item
//         )
//       );
//     } else {
//       setCartItems([...cartItems, { ...product, quantity: 1 }]);
//     }
//   };

//   const removeFromCart = (id) => {
//     setCartItems(cartItems.filter((item) => item.id !== id));
//   };

//   const updateQuantity = (id, newQty) => {
//     if (newQty <= 0) {
//       removeFromCart(id);
//     } else {
//       setCartItems(
//         cartItems.map((item) =>
//           item.id === id ? { ...item, quantity: newQty } : item
//         )
//       );
//     }
//   };

//   const handleLogout = () => {
//     setIsLoggedIn(false);
//     localStorage.removeItem("cart");
//     console.log("Tizimdan chiqildi.");
//   };

//   const totalItems = cartItems.reduce((sum, item) => sum + item.quantity, 0);

//   return (
//     <div className="app">
//       <Router>
//         {isLoggedIn ? (
//           <>
//             <Navbar
//               cartCount={totalItems}
//               cartItems={cartItems}
//               onRemove={removeFromCart}
//               onUpdate={updateQuantity}
//             />
//             <Routes>
//               <Route
//                 path="/"
//                 element={
//                   <>
//                     <Home />
//                     <ProductList addToCart={addToCart} />
//                   </>
//                 }
//               />
//               <Route
//                 path="/buyurtma"
//                 element={
//                   <BuyurtmaBerish
//                     addToCart={addToCart}
//                     onLogout={handleLogout}
//                   />
//                 }
//               />
//               <Route path="/about" element={<About />} />
//               <Route path="/services" element={<Services />} />
//               <Route path="/contact" element={<Contact />} />
//               <Route path="/rasmiylashtirish" element={<Rasmiylashtirish />} />
//             </Routes>
//           </>
//         ) : (
//           <div style={{ textAlign: "center", marginTop: "50px" }}>
//             <h2>Iltimos, tizimga kiring</h2>
//           </div>
//         )}
//       </Router>
//     </div>
//   );
// }

// export default App;
