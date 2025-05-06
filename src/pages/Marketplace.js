import React, { useState, useEffect } from "react";
import axios from "axios";
import "../styles/marketplace.css";

const Marketplace = () => {
  const [products, setProducts] = useState([]);
  const [cart, setCart] = useState([]);

  // Fetch products from backend
  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const response = await axios.get("http://localhost:9090/api/admin/marketplace/all");
        setProducts(response.data);
      } catch (error) {
        console.error("Failed to fetch products:", error);
      }
    };

    fetchProducts();
  }, []);

  const handleAddToCart = (item) => {
    setCart([...cart, item]);
    alert(`${item.productName} added to cart!`);
  };

  return (
    <div className="marketplace-container">
      <h2>Hygiene Marketplace</h2>
      <p>Support menstrual hygiene by purchasing essential products.</p>

      <div className="product-list">
        {products.length === 0 ? (
          <p>Loading products...</p>
        ) : (
          products.map((item, index) => (
            <div className="product-card" key={index}>
              <img src={item.imageUrl} alt={item.productName} />
              <h3>{item.productName}</h3>
              <p className="price">₹{item.price}</p>
              <p className="stock">Stock: {item.stock}</p>
              <p className="availability">{item.availability}</p>
              <button onClick={() => handleAddToCart(item)}>Buy Now</button>
            </div>
          ))
        )}
      </div>

      <div className="cart">
        <h3>Shopping Cart</h3>
        {cart.length === 0 ? (
          <p>Your cart is empty.</p>
        ) : (
          <ul>
            {cart.map((item, index) => (
              <li key={index}>
                {item.productName} - ₹{item.price}
              </li>
            ))}
          </ul>
        )}
      </div>
    </div>
  );
};

export default Marketplace;
