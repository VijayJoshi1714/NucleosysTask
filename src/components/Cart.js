import React from "react";

function Cart({ items, update, remove }) {
  let total = 0;
  if (items) {
    for (let item of items) {
      total = total + item.price * item.qty;
    }
  }
  return (
    <div className="cart">
      <h2>Shopping Cart</h2>
      {!items?.length ? (
        <p>Your cart is empty</p>
      ) : (
        <>
          {items.map((item) => (
            <div key={item.id} className="cart-item">
              <img src={item.image} />
              <div className="item-details">
                <h3>{item.name}</h3>
                <p>${item.price}</p>
                <div className="quantity-controls">
                  <button onClick={() => update(item.id, item.qty - 1)}>
                    -
                  </button>
                  <span>{item.qty}</span>
                  <button onClick={() => update(item.id, item.qty + 1)}>
                    +
                  </button>
                </div>
                <button onClick={() => remove(item.id)}>Remove</button>
              </div>
            </div>
          ))}
          <div className="cart-total">
            <h3>Total: ${total}</h3>
          </div>
        </>
      )}
    </div>
  );
}

export default Cart;
