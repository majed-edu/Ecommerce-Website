import ProductCard from "../components/ProductCard";
import { products } from "../data/Products";

export default function Home() {
  return (
    <div className="page">
      <div className="home-hero">
        <h1 className="home-title">Welcome to ShobHub</h1>
        <p className="home-subtitle">Your one-stop shop for all your needs!</p>
      </div>
      <div className="container">
        <h2 className="page-title">Our Products</h2>
        <div className="product-grid">
          {products.map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>
      </div>
    </div>
  );
}
