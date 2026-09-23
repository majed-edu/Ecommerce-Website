import { Link } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import { useCart } from "../context/CartContext";

export default function Navbar() {
  const { user, logout } = useAuth();
  const { totalItems } = useCart();

  return (
    <nav className="navbar">
      <div className="container nav-inner">
        <Link to="/" className="brand">
          ShobHub
        </Link>
        <div className="nav-links">
          <Link to="/">Home</Link>
          <Link to="/checkout" className="cart-link">
            Cart{" "}
            {totalItems > 0 && <span className="cart-count">{totalItems}</span>}
          </Link>
          {!user ? (
            <>
              <Link to="/auth" className="btn btn-secondary">
                Login
              </Link>
              <Link to="/auth" className="btn btn-primary">
                Signup
              </Link>
            </>
          ) : (
            <>
              <span>Hello, {user.name || user.email}</span>
              <button className="nav-action" onClick={logout}>
                Logout
              </button>
            </>
          )}
        </div>
      </div>
    </nav>
  );
}
