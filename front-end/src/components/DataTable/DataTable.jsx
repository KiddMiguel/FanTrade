import React, { useState } from "react";
import {
  Box,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Typography,
  Paper,
  TablePagination,
  TextField,
} from "@mui/material";

const DataTable = () => {
  // Données fictives pour les produits
  const initialProducts = [
    {
      id: "1",
      name: "Ergonomic Chair",
      description: "Comfortable office chair with lumbar support.",
      price: 120.99,
      category: "Furniture",
      owner: "User123",
    },
    {
      id: "2",
      name: "Wireless Keyboard",
      description: "Compact and stylish keyboard with long battery life.",
      price: 45.99,
      category: "Electronics",
      owner: "User456",
    },
    {
      id: "3",
      name: "Noise Cancelling Headphones",
      description: "Over-ear headphones with active noise cancellation.",
      price: 199.99,
      category: "Electronics",
      owner: "User789",
    },
    {
      id: "4",
      name: "Standing Desk",
      description: "Adjustable desk for a healthier working posture.",
      price: 299.99,
      category: "Furniture",
      owner: "User123",
    },
    {
      id: "5",
      name: "LED Desk Lamp",
      description: "Energy-efficient lamp with adjustable brightness.",
      price: 29.99,
      category: "Accessories",
      owner: "User456",
    },
    {
      id: "6",
      name: "LED Desk Lamp",
      description: "Energy-efficient lamp with adjustable brightness.",
      price: 29.99,
      category: "Accessories",
      owner: "User456",
    },
  ];

  const [products, setProducts] = useState(initialProducts);
  const [filteredProducts, setFilteredProducts] = useState(initialProducts);

  // Pagination
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(5);

  // Gestion des filtres
  const handleFilter = (e) => {
    const value = e.target.value.toLowerCase();
    const filtered = products.filter(
      (product) =>
        product.name.toLowerCase().includes(value) ||
        product.description.toLowerCase().includes(value) ||
        product.category.toLowerCase().includes(value) ||
        product.owner.toLowerCase().includes(value)
    );
    setFilteredProducts(filtered);
  };

  // Pagination handlers
  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };

  return (
    <Box sx={{ marginTop: 4 }}>
      <Typography variant="h6" gutterBottom>
        Product List
      </Typography>

      {/* Filtre */}
      <TextField
        label="Search..."
        variant="outlined"
        fullWidth
        sx={{ marginBottom: 2 }}
        onChange={handleFilter}
      />

      <TableContainer component={Paper}>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>ID</TableCell>
              <TableCell>Name</TableCell>
              <TableCell>Description</TableCell>
              <TableCell>Price</TableCell>
              <TableCell>Category</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {filteredProducts
              .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
              .map((product) => (
                <TableRow key={product.id}>
                  <TableCell>{product.id}</TableCell>
                  <TableCell>{product.name}</TableCell>
                  <TableCell>{product.description}</TableCell>
                  <TableCell>{product.price.toFixed(2)} €</TableCell>
                  <TableCell>{product.category}</TableCell>
                </TableRow>
              ))}
          </TableBody>
        </Table>

        {/* Pagination */}
        <TablePagination
          rowsPerPageOptions={[5, 10, 15]}
          component="div"
          count={filteredProducts.length}
          rowsPerPage={rowsPerPage}
          page={page}
          onPageChange={handleChangePage}
          onRowsPerPageChange={handleChangeRowsPerPage}
        />
      </TableContainer>
    </Box>
  );
};

export default DataTable;
