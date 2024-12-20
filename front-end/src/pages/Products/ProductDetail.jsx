import React from "react";
import {
  Box,
  Typography,
  Grid,
  Card,
  CardMedia,
  CardContent,
  Button,
  Rating,
  Divider,
} from "@mui/material";

const ProductDetail = ({ product }) => {
  return (
    <Box sx={{ padding: 4 }}>
      {/* Product Header */}
      <Typography variant="h4" sx={{ fontWeight: "bold", mb: 3 }}>
        {product.name}
      </Typography>
      <Typography variant="subtitle1" color="textSecondary" sx={{ mb: 2 }}>
        {product.category} | {product.universe}
      </Typography>

      {/* Main Content */}
      <Grid container spacing={4}>
        {/* Image Section */}
        <Grid item xs={12} md={6}>
          <Card>
            <CardMedia
              component="img"
              height="400"
              image={product.images[0]}
              alt={product.name}
              sx={{ objectFit: "cover" }}
            />
          </Card>
        </Grid>

        {/* Product Details Section */}
        <Grid item xs={12} md={6}>
          <CardContent>
            <Typography variant="h5" sx={{ mb: 2, fontWeight: "bold" }}>
              {product.price.toFixed(2)} €
            </Typography>

            <Typography variant="body1" sx={{ mb: 2 }}>
              {product.description}
            </Typography>

            <Box sx={{ display: "flex", alignItems: "center", gap: 1, mb: 3 }}>
              <Typography variant="subtitle1" sx={{ fontWeight: "bold" }}>
                Ratings:
              </Typography>
              <Rating
                value={
                  product.ratings.reduce((sum, r) => sum + r.rating, 0) /
                    product.ratings.length ||
                  0
                }
                precision={0.5}
                readOnly
              />
              <Typography variant="subtitle2" color="textSecondary">
                ({product.ratings.length} reviews)
              </Typography>
            </Box>

            <Divider sx={{ mb: 3 }} />

            <Button
              variant="contained"
              color="primary"
              sx={{ textTransform: "none", width: "100%" }}
            >
              Add to Cart
            </Button>
          </CardContent>
        </Grid>
      </Grid>

      {/* Reviews Section */}
      <Box sx={{ mt: 5 }}>
        <Typography variant="h5" sx={{ mb: 3, fontWeight: "bold" }}>
          Customer Reviews
        </Typography>
        {product.ratings.map((rating, index) => (
          <Box key={index} sx={{ mb: 3 }}>
            <Typography variant="subtitle1" sx={{ fontWeight: "bold" }}>
              User {rating.user}
            </Typography>
            <Rating value={rating.rating} precision={0.5} readOnly sx={{ mb: 1 }} />
            <Typography variant="body2" color="textSecondary">
              {rating.comment}
            </Typography>
          </Box>
        ))}
      </Box>
    </Box>
  );
};

export default ProductDetail;
