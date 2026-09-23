import { useState, useEffect } from "react";
import { useParams, Link, useNavigate } from "react-router-dom";
import { getProductById } from "../data/Products";

export default function ProductDetails() {
  const { id } = useParams();
  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    const foundProduct = getProductById(id);

    if (!foundProduct) {
      // إرجاع المستخدم للرئيسية إذا لم يتم العثور على المنتج
      navigate("/", { replace: true });
    } else {
      setProduct(foundProduct);
      setLoading(false);
    }
  }, [id, navigate]);

  if (loading) {
    return (
      <div className="page">
        <div className="container">
          <div>Loading...</div>
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
          style={{ marginBottom: "20px", display: "inline-block" }}
        >
          &larr; Back to Products
        </Link>
        <div className="product-detail">
          <div className="product-detail-image">
            <img src={product.image} alt={product.name} />
          </div>
          <div className="product-detail-content">
            <h1 className="product-detail-name">{product.name}</h1>
            <p className="product-detail-price">${product.price}</p>
            <p className="product-detail-description">{product.description}</p>
            <button className="btn btn-primary">Add to Cart</button>
          </div>
        </div>
      </div>
    </div>
  );
}
