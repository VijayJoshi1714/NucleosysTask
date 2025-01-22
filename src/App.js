import React, { useState } from "react";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
} from "react-router-dom";
import { useNavigate } from "react-router-dom";
import { AuthProvider, useAuth } from "./context/AuthContext";
import { FaShoppingCart, FaTimes } from "react-icons/fa";
import Login from "./components/auth/Login";
import Register from "./components/auth/Register";
import ProductList from "./components/ProductList";
import Cart from "./components/Cart";
import productData from "./products.json";
import "./App.css";

const PrivateRoute = ({ children }) => {
  const { user } = useAuth();
  return user ? children : <Navigate to="/login" />;
};

// Main content component that contains products and cart
const MainContent = () => {
  const [items, setItems] = useState([]);
  const [isCartOpen, setIsCartOpen] = useState(false);
  const list = productData.products;
  const { logout } = useAuth();
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate("/login");
  };

  const add = (item) => {
    setItems((prev) => {
      for (let x of prev) {
        if (x.id === item.id) {
          x.qty = x.qty + 1;
          return [...prev];
        }
      }
      return [...prev, { ...item, qty: 1 }];
    });
  };

  const update = (id, qty) => {
    if (qty < 1) {
      alert("Min is 1");
      return;
    }
    if (qty > 10) {
      alert("Max is 10");
      return;
    }
    setItems((prev) => {
      for (let x of prev) {
        if (x.id === id) {
          x.qty = qty;
        }
      }
      return [...prev];
    });
  };

  const remove = (id) => {
    if (window.confirm("remove this item?")) {
      setItems((prev) => {
        let newItem = [];
        for (let x of prev) {
          if (x.id !== id) {
            newItem.push(x);
          }
        }
        return newItem;
      });
    }
  };

  const getTotalItems = () => {
    return items.reduce((total, item) => total + item.qty, 0);
  };

  return (
    <div className="App-container">
      <div className="header-buttons">
        <button
          className="cart-button"
          onClick={() => setIsCartOpen(true)}
          aria-label="Open Cart"
        >
          <FaShoppingCart />
          {items.length > 0 && (
            <span className="cart-count">{getTotalItems()}</span>
          )}
        </button>
        <button onClick={handleLogout} className="logout-button">
          Logout
        </button>
      </div>

      <main className={`App-main ${isCartOpen ? "blur" : ""}`}>
        <ProductList list={list} add={add} />
      </main>

      {isCartOpen && (
        <>
          <div
            className="cart-backdrop"
            onClick={() => setIsCartOpen(false)}
          ></div>
          <div className="cart-overlay">
            <div className="cart-sidebar">
              <div className="cart-header">
                <h2>Shopping Cart</h2>
                <button
                  className="close-cart"
                  style={{ right: "50px" }}
                  onClick={() => setIsCartOpen(false)}
                  aria-label="Close Cart"
                >
                  <FaTimes />
                </button>
              </div>
              <Cart items={items} update={update} remove={remove} />
            </div>
          </div>
        </>
      )}
    </div>
  );
};

function App() {
  return (
    <AuthProvider>
      <Router>
        <div className="App">
          <Routes>
            <Route path="/login" element={<Login />} />
            <Route path="/register" element={<Register />} />
            <Route
              path="/"
              element={
                <PrivateRoute>
                  <MainContent />
                </PrivateRoute>
              }
            />
          </Routes>
        </div>
      </Router>
    </AuthProvider>
  );
}

export default App;
