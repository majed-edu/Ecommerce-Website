import React from "react";
import { getProducts } from "../data/Products";
import ProductCard from "../components/ProductCard";
export default function Home() {
  const product = getProducts();
  return (
    <div className="page">
      <div className="home-hero">
        <h1 className="home-tilte">Welcome to ShobHub</h1>
        <p className="home-subtitle">Your one-stop shop for all your needs!</p>
      </div>

      <div className="container">
        <h2 className="page-title">Our Products</h2>
        <div className="product-grid">
          {product.map((product) => (
           <ProductCard key={product.id} product={product} />
          ))}
        </div>
      </div>
    </div>
  );
}
