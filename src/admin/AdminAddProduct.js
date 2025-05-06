import React, { useState, useEffect } from "react";
import axios from "axios";
import { TextField, Button, MenuItem, Typography, Paper, List, ListItem, ListItemText } from "@mui/material";
import "../styles/adminAddProduct.css";

const AdminAddProduct = () => {
  const [product, setProduct] = useState({
    productName: "",
    description: "",
    price: "",
    category: "",
    imageUrl: "",
    stock: "",
    availability: "In Stock",
  });

  const [message, setMessage] = useState("");
  const [products, setProducts] = useState([]);
  const [editingId, setEditingId] = useState(null);

  const categories = ["Hygiene", "Health", "Education", "Awareness", "Other"];

  useEffect(() => {
    fetchProducts();
  }, []);

  const fetchProducts = async () => {
    try {
      const res = await axios.get("http://localhost:9090/api/admin/marketplace/all");
      setProducts(res.data);
    } catch (err) {
      console.error("Fetch products error:", err);
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setProduct({ ...product, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      if (editingId) {
        // Update product
        await axios.put(`http://localhost:9090/api/admin/marketplace/update/${editingId}`, product);
        setMessage("Product updated successfully!");
      } else {
        // Add new product
        await axios.post("http://localhost:9090/api/admin/marketplace/add", product);
        setMessage("Product added successfully!");
      }

      setProduct({
        productName: "",
        description: "",
        price: "",
        category: "",
        imageUrl: "",
        stock: "",
        availability: "In Stock",
      });
      setEditingId(null);
      fetchProducts();
    } catch (error) {
      setMessage("Operation failed.");
      console.error("Submit error:", error);
    }
  };

  const handleEdit = (prod) => {
    setProduct(prod);
    setEditingId(prod.id);
    setMessage("");
  };

  const handleDelete = async (id) => {
    try {
      await axios.delete(`http://localhost:9090/api/admin/marketplace/delete/${id}`);
      setMessage("Product deleted successfully!");
      fetchProducts();
    } catch (err) {
      console.error("Delete error:", err);
      setMessage("Failed to delete product.");
    }
  };

  return (
    <div className="admin-panel-container">
      <Paper className="admin-product-form">
        <Typography variant="h5" gutterBottom>{editingId ? "Update Product" : "Add Product to Marketplace"}</Typography>

        <form onSubmit={handleSubmit} className="product-form">
          <TextField label="Product Name" name="productName" value={product.productName} onChange={handleChange} required />
          <TextField label="Description" name="description" multiline rows={3} value={product.description} onChange={handleChange} required />
          <TextField label="Price (₹)" name="price" type="number" value={product.price} onChange={handleChange} required />
          <TextField label="Category" name="category" select value={product.category} onChange={handleChange} required>
            {categories.map((cat) => (
              <MenuItem key={cat} value={cat}>{cat}</MenuItem>
            ))}
          </TextField>
          <TextField label="Image URL" name="imageUrl" value={product.imageUrl} onChange={handleChange} />
          <TextField label="Stock" name="stock" type="number" value={product.stock} onChange={handleChange} required />
          <TextField label="Availability" name="availability" select value={product.availability} onChange={handleChange}>
            <MenuItem value="In Stock">In Stock</MenuItem>
            <MenuItem value="Out of Stock">Out of Stock</MenuItem>
          </TextField>

          <Button type="submit" variant="contained" color="primary">
            {editingId ? "Update Product" : "Add Product"}
          </Button>

          {message && <Typography className="submit-message">{message}</Typography>}
        </form>
      </Paper>

      <Paper className="product-list-admin">
        <Typography variant="h6">Marketplace Products</Typography>
        <List>
          {products.map((prod) => (
            <ListItem key={prod.id} className={editingId === prod.id ? "selected-product" : ""}>
              <ListItemText primary={prod.productName} secondary={`₹${prod.price} | ${prod.availability}`} />
              <Button variant="outlined" size="small" color="primary" onClick={() => handleEdit(prod)}>Edit</Button>
              <Button variant="outlined" size="small" color="secondary" onClick={() => handleDelete(prod.id)} style={{ marginLeft: "8px" }}>Delete</Button>
            </ListItem>
          ))}
        </List>
      </Paper>
    </div>
  );
};

export default AdminAddProduct;
