import { useState } from "react";
import { Link } from "react-router-dom";
import { useCart } from "../context/CartContext";

export default function Checkout() {
  const { items, subtotal, changeQuantity, removeFromCart, clearCart } =
    useCart();
  const [placed, setPlaced] = useState(false);
  const shipping = subtotal >= 200 || subtotal === 0 ? 0 : 25;
  const total = subtotal + shipping;

  if (placed) {
    return (
      <div className="page">
        <div className="container success-state">
          <h1>Order Placed Successfully</h1>
          <p>Thank you for shopping with ShobHub.</p>
          <button
            className="btn btn-primary"
            onClick={() => {
              clearCart();
              setPlaced(false);
            }}
          >
            Continue Shopping
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="page">
      <div className="container">
        <h1 className="page-title">Shopping Cart</h1>
        {items.length === 0 ? (
          <div className="empty-state">
            <h2>Your cart is empty</h2>
            <p>Add products to your cart to continue.</p>
            <Link to="/" className="btn btn-primary">
              Continue Shopping
            </Link>
          </div>
        ) : (
          <div className="checkout-grid">
            <section className="cart-list">
              <h2>Cart Items ({items.length})</h2>
              {items.map((item) => (
                <div className="cart-item" key={item.id}>
                  <img
                    className="cart-item-image"
                    src={item.image}
                    alt={item.name}
                  />
                  <div className="cart-item-details">
                    <h3>{item.name}</h3>
                    <p>${item.price.toFixed(2)} each</p>
                    <div className="quantity-controls">
                      <button
                        className="quantity-btn"
                        onClick={() => changeQuantity(item.id, -1)}
                        aria-label={`Decrease ${item.name} quantity`}
                      >
                        -
                      </button>
                      <span>{item.quantity}</span>
                      <button
                        className="quantity-btn"
                        onClick={() => changeQuantity(item.id, 1)}
                        aria-label={`Increase ${item.name} quantity`}
                      >
                        +
                      </button>
                    </div>
                  </div>
                  <strong>${(item.price * item.quantity).toFixed(2)}</strong>
                  <button
                    className="remove-button"
                    onClick={() => removeFromCart(item.id)}
                    aria-label={`Remove ${item.name}`}
                  >
                    Remove
                  </button>
                </div>
              ))}
              <button className="btn btn-secondary" onClick={clearCart}>
                Clear Cart
              </button>
            </section>
            <aside className="summary">
              <h2>Order Summary</h2>
              <div>
                <span>Subtotal</span>
                <strong>${subtotal.toFixed(2)}</strong>
              </div>
              <div>
                <span>Shipping</span>
                <strong>
                  {shipping === 0 ? "Free" : `$${shipping.toFixed(2)}`}
                </strong>
              </div>
              <hr />
              <div className="summary-total">
                <span>Total</span>
                <strong>${total.toFixed(2)}</strong>
              </div>
              <button
                className="btn btn-primary btn-block"
                onClick={() => setPlaced(true)}
              >
                Place Order
              </button>
            </aside>
          </div>
        )}
      </div>
    </div>
  );
}
