import React, { useState, useEffect } from "react";
import axios from "axios";
import {
  TextField,
  Button,
  MenuItem,
  Typography,
  Paper,
  List,
  ListItem,
  ListItemText,
} from "@mui/material";

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
      const res = await axios.get(`${process.env.REACT_APP_API_URL || "http://localhost:8080/api"}/admin/marketplace/all`);
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
        await axios.put(`${process.env.REACT_APP_API_URL || "http://localhost:8080/api"}/admin/marketplace/update/${editingId}`, product);
        setMessage("Product updated successfully!");
      } else {
        await axios.post(`${process.env.REACT_APP_API_URL || "http://localhost:8080/api"}/admin/marketplace/add`, product);
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
      await axios.delete(`${process.env.REACT_APP_API_URL || "http://localhost:8080/api"}/admin/marketplace/delete/${id}`);
      setMessage("Product deleted successfully!");
      fetchProducts();
    } catch (err) {
      console.error("Delete error:", err);
      setMessage("Failed to delete product.");
    }
  };

  return (
    <div className="max-w-4xl mx-auto mt-8 p-4">
      {/* Product Form */}
      <Paper className="p-8 rounded-xl shadow-lg bg-gradient-to-r from-yellow-200 to-orange-300 mb-10">
        <Typography variant="h5" className="mb-6 font-bold text-gray-800">
          {editingId ? "Update Product" : "Add Product to Marketplace"}
        </Typography>

        <form onSubmit={handleSubmit} className="flex flex-col gap-4">
          <TextField label="Product Name" name="productName" value={product.productName} onChange={handleChange} required fullWidth />
          <TextField label="Description" name="description" multiline rows={3} value={product.description} onChange={handleChange} required fullWidth />
          <TextField label="Price (₹)" name="price" type="number" value={product.price} onChange={handleChange} required fullWidth />
          <TextField label="Category" name="category" select value={product.category} onChange={handleChange} required fullWidth>
            {categories.map((cat) => (
              <MenuItem key={cat} value={cat}>{cat}</MenuItem>
            ))}
          </TextField>
          <TextField label="Image URL" name="imageUrl" value={product.imageUrl} onChange={handleChange} fullWidth />
          <TextField label="Stock" name="stock" type="number" value={product.stock} onChange={handleChange} required fullWidth />
          <TextField label="Availability" name="availability" select value={product.availability} onChange={handleChange} fullWidth>
            <MenuItem value="In Stock">In Stock</MenuItem>
            <MenuItem value="Out of Stock">Out of Stock</MenuItem>
          </TextField>

          <Button type="submit" variant="contained" color="primary">
            {editingId ? "Update Product" : "Add Product"}
          </Button>

          {message && (
            <Typography className="text-green-600 font-semibold mt-2">
              {message}
            </Typography>
          )}
        </form>
      </Paper>

      {/* Product List */}
      <Paper className="p-6 shadow-md rounded-lg bg-white">
        <Typography variant="h6" className="mb-4 text-gray-700 font-semibold">
          Marketplace Products
        </Typography>
        <List>
          {products.map((prod) => (
            <ListItem
              key={prod.id}
              className={`flex flex-col md:flex-row md:items-center md:justify-between ${editingId === prod.id ? "bg-yellow-100" : ""
                } py-2 px-2 rounded-md`}
            >
              <ListItemText
                primary={prod.productName}
                secondary={`₹${prod.price} | ${prod.availability}`}
              />
              <div className="flex gap-2 mt-2 md:mt-0">
                <Button variant="outlined" size="small" color="primary" onClick={() => handleEdit(prod)}>
                  Edit
                </Button>
                <Button variant="outlined" size="small" color="secondary" onClick={() => handleDelete(prod.id)}>
                  Delete
                </Button>
              </div>
            </ListItem>
          ))}
        </List>
      </Paper>
    </div>
  );
};

export default AdminAddProduct;

