import React, { useEffect, useState } from "react";
import Carousel from "../../components/Carousel/Carousel";
import image1 from "../../assets/images/image1.jpg";
import image2 from "../../assets/images/image2.jpg";
import image3 from "../../assets/images/image3.jpg";
import { Box, Typography } from "@mui/material";
import ProductGrid from "../../components/ProductGrid/ProductGrid";
import { getProducts } from "../../api/api";

const Accueil = () => {
  const [products, setProducts] = useState([]);

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const allProducts = await getProducts();
        setProducts(allProducts.slice(0, 8));
      } catch (error) {
        console.error("Error fetching products:", error);
      }
    };

    fetchProducts();
  }, []);

  const carouselItems = [
    {
      title: "Summer Sale",
      subtitle: "Sale starting at $20",
      buttonText: "Shop Now",
      image: image1,
    },
    {
      title: "Modern Furniture",
      subtitle: "Get up to 50% off",
      buttonText: "Discover",
      image: image2,
    },
    {
      title: "Latest Gadgets",
      subtitle: "Affordable prices for you",
      buttonText: "Explore Now",
      image: image3,
    },
  ];

  return (
    <div>
      <Carousel items={carouselItems} />
      <Box>
        <Typography
          variant="h4"
          sx={{
            padding: "16px",
            fontWeight: "bold",
            marginBottom: "16px",
            textAlign: "center",
            color: "white",
            backgroundColor: "rgb(25, 118, 210)",
            fontSize: "14px",
          }}
        >
          Vos produits préférés
        </Typography>
      </Box>
      <Box
        sx={{
          display: "flex",
          flexWrap: "wrap",
          gap: "16px",
          justifyContent: "center",
        }}
      >
        <ProductGrid products={products} />
      </Box>
    </div>
  );
};

export default Accueil;
