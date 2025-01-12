import React, { useState } from "react";
import "./App.css";
import ProductList from "./components/ProductList";
import Cart from "./components/Cart";
import productData from "./products.json";

function App() {
  const [items, setItems] = useState([]);
  const list = productData.products;
  console.log(list);

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

  return (
    <div className="App">
      <main className="App-main">
        <ProductList list={list} add={add} />
        <Cart items={items} update={update} remove={remove} />
      </main>
    </div>
  );
}

export default App;
