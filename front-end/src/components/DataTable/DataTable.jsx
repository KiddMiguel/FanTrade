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
  IconButton,
  Button,
} from "@mui/material";
import { Edit, Delete, Add } from "@mui/icons-material";
import ModalYesNo from "../ModalYesNo/ModalYesNo";
import ModalAddEdit from "../ModalAddEdit/ModalAddEdit";
import { deleteProduct } from "../../api/api";

const DataTable = () => {
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
  ];

  const [products, setProducts] = useState(initialProducts);
  const [filteredProducts, setFilteredProducts] = useState(initialProducts);
  const [modalDeleteOpen, setModalDeleteOpen] = useState(false);
  const [modalAddEditOpen, setModalAddEditOpen] = useState(false);
  const [productToDelete, setProductToDelete] = useState(null);
  const [productToEdit, setProductToEdit] = useState(null);

  const handleDeleteClick = (product) => {
    setProductToDelete(product);
    setModalDeleteOpen(true);
  };

  const confirmDelete = async () => {
    try {
      await deleteProduct(productToDelete.id);
      setProducts((prev) => prev.filter((p) => p.id !== productToDelete.id));
      setFilteredProducts((prev) => prev.filter((p) => p.id !== productToDelete.id));
      setModalDeleteOpen(false);
    } catch (error) {
      console.error("Error deleting product:", error);
    }
  };

  const cancelDelete = () => {
    setModalDeleteOpen(false);
  };

  const handleAddClick = () => {
    setProductToEdit(null);
    setModalAddEditOpen(true);
  };

  const handleEditClick = (product) => {
    setProductToEdit(product);
    setModalAddEditOpen(true);
  };

  const handleSaveProduct = (product) => {
    if (productToEdit) {
      setProducts((prev) => prev.map((p) => (p.id === product.id ? product : p)));
    } else {
      setProducts((prev) => [...prev, { ...product, id: Date.now().toString() }]);
    }
    setFilteredProducts((prev) =>
      productToEdit
        ? prev.map((p) => (p.id === product.id ? product : p))
        : [...prev, { ...product, id: Date.now().toString() }]
    );
    setModalAddEditOpen(false);
  };

  return (
    <Box sx={{ marginTop: 4 }}>
      <Typography variant="h6" gutterBottom>
        Liste des produits
      </Typography>

      <Box sx={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 2 }}>
        <TextField
          label="Search..."
          variant="outlined"
          fullWidth
          onChange={(e) => {
            const value = e.target.value.toLowerCase();
            setFilteredProducts(
              products.filter(
                (product) =>
                  product.name.toLowerCase().includes(value) ||
                  product.description.toLowerCase().includes(value)
              )
            );
          }}
        />
        <Button
          variant="contained"
          color="primary"
          startIcon={<Add />}
          sx={{ marginLeft: 2, textTransform: "none", borderRadius: "8px", padding: "8px 20px" }}
          onClick={handleAddClick}
        >
          Ajouter
        </Button>
      </Box>

      <TableContainer component={Paper}>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>ID</TableCell>
              <TableCell>Name</TableCell>
              <TableCell>Description</TableCell>
              <TableCell>Price</TableCell>
              <TableCell>Category</TableCell>
              <TableCell>Actions</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {filteredProducts.map((product) => (
              <TableRow key={product.id}>
                <TableCell>{product.id}</TableCell>
                <TableCell>{product.name}</TableCell>
                <TableCell>{product.description}</TableCell>
                <TableCell>{product.price.toFixed(2)} €</TableCell>
                <TableCell>{product.category}</TableCell>
                <TableCell>
                  <IconButton color="primary" onClick={() => handleEditClick(product)}>
                    <Edit />
                  </IconButton>
                  <IconButton color="error" onClick={() => handleDeleteClick(product)}>
                    <Delete />
                  </IconButton>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>

        <TablePagination
          rowsPerPageOptions={[5, 10]}
          component="div"
          count={filteredProducts.length}
          rowsPerPage={5}
          page={0}
          onPageChange={() => {}}
          onRowsPerPageChange={() => {}}
        />
      </TableContainer>

      {/* Modal Yes/No */}
      <ModalYesNo
        open={modalDeleteOpen}
        title="Confirmation de suppression"
        description={`Voulez-vous vraiment supprimer le produit "${productToDelete?.name}" ?`}
        onConfirm={confirmDelete}
        onCancel={cancelDelete}
      />

      {/* Modal Add/Edit */}
      <ModalAddEdit
        open={modalAddEditOpen}
        product={productToEdit}
        onSave={handleSaveProduct}
        onCancel={() => setModalAddEditOpen(false)}
      />
    </Box>
  );
};

export default DataTable;
