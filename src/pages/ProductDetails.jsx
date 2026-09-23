import { Link, useParams } from "react-router-dom";
import { getProductById } from "../data/Products";
import { useCart } from "../context/CartContext";

export default function ProductDetails() {
  const { id } = useParams();
  const product = getProductById(id);
  const { addToCart } = useCart();

  if (!product) {
    return (
      <div className="page">
        <div className="container">
          <h2>Product Not Found</h2>
          <p>The product you are looking for does not exist.</p>
          <Link to="/" className="btn btn-secondary">
            Back to Home
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="page">
      <div className="container">
        <Link
          to="/"
          className="btn btn-secondary"
          style={{ marginBottom: "20px" }}
        >
          &larr; Back to Products
        </Link>
        <div className="product-detail">
          <div className="product-detail-image">
            <img src={product.image} alt={product.name} />
          </div>
          <div>
            <h1 className="product-detail-name">{product.name}</h1>
            <p className="product-detail-price">${product.price.toFixed(2)}</p>
            <p className="product-detail-description">{product.description}</p>
            <button
              className="btn btn-primary"
              onClick={() => addToCart(product)}
            >
              Add to Cart
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
