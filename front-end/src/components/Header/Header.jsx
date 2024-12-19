import React from "react";
import { AppBar, Toolbar, Typography, Box, Button } from "@mui/material";
import { useNavigate } from "react-router-dom";

const Header = () => {
    const navigate = useNavigate();

  const handleNavigation = (path) => {
    navigate(path);
  };

  return (
    <AppBar position="static" color="default" sx={{ padding: "0 16px", boxShadow: "none", borderBottom: "1px solid #ddd" }}>
      <Toolbar>
        {/* Logo */}
        <Typography
          variant="h6"
          component="div"
          sx={{ flexGrow: 1, fontWeight: "bold", color: "#E53935", cursor: "pointer" }}
          onClick={() => handleNavigation("/")}
        >
          FAN<span style={{ color: "#1976D2" }}>TRADE</span>
        </Typography>

        {/* Navigation Links */}
        <Box sx={{ display: "flex", alignItems: "center", gap: 2, mr: 2 }}>
          <Typography
            variant="button"
            sx={{ color: "#000", cursor: "pointer", textTransform: "none" }}
            onClick={() => handleNavigation("/")}
          >
            Accueil
          </Typography>
          <Typography
            variant="button"
            sx={{ color: "#000", cursor: "pointer", textTransform: "none" }}
            onClick={() => handleNavigation("/products")}
          >
            Produits
          </Typography>
          <Typography
            variant="button"
            sx={{ color: "#000", cursor: "pointer", textTransform: "none" }}
            onClick={() => handleNavigation("/dashboard")}
          >
            Dashboard
          </Typography>
        </Box>

        {/* Login/Signup Button */}
        <Button
          variant="contained"
          color="primary"
          sx={{ textTransform: "none" }}
          onClick={() => handleNavigation("/login")}
        >
          Connexion
        </Button>
      </Toolbar>
    </AppBar>
  );
};

export default Header;
