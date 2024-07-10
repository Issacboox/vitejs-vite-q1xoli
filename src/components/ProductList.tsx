import React, { useState, useEffect } from 'react';
import {
  Grid,
  Card,
  CardMedia,
  CardContent,
  Typography,
  CardActions,
  Button,
} from '@mui/material';
import { Product } from '../types';
import { debounce } from '../utils/debounce';
import AddShoppingCartIcon from '@mui/icons-material/AddShoppingCart';


interface ProductListProps {
  products: Product[];
  addToCart: (product: Product) => void;
  searchTerm: string;
}

const ProductList: React.FC<ProductListProps> = ({
  products,
  addToCart,
  searchTerm,
}) => {
  const [filteredProducts, setFilteredProducts] = useState<Product[]>([]);

  useEffect(() => {
    const filtered = products.filter((product) =>
      product.name.toLowerCase().includes(searchTerm)
    );
    setFilteredProducts(filtered);
  }, [products, searchTerm]);

  return (
    <Grid container spacing={2}>
      {filteredProducts.map((product) => (
        <Grid item xs={12} sm={6} md={4} key={product.id}>
          <Card sx={{ maxWidth: 345, borderRadius: '20px' }}>
            <CardMedia
              sx={{
                height: 180,
                objectFit: 'cover',
                transition: 'transform 0.3s ease-in-out',
                '&:hover': {
                  transform: 'scale(1.1)',
                },
              }}
              image={product.img}
              title="Product Image"
            />
            <CardContent>
              <Typography
                gutterBottom
                variant="h6"
                component="div"
                style={{
                  textTransform: 'uppercase',
                  textAlign: 'center',
                  fontWeight: 'semibold',
                  fontFamily: 'JetBrains Mono, monospace',
                }}
              >
                {product.name}
              </Typography>
              <Typography
                variant="body2"
                color="text.secondary"
                style={{ fontFamily: 'JetBrains Mono, monospace' }}
              >
                {product.price.toLocaleString('en-US', {
                  minimumFractionDigits: 0,
                  maximumFractionDigits: 2,
                })}{' '}
                Baht /Kilo
              </Typography>
              <Typography
                variant="body2"
                style={{
                  color: product.stock < 10 ? 'red' : 'inherit',
                  fontFamily: 'JetBrains Mono, monospace',
                }}
              >
                stock : {product.stock}
              </Typography>
            </CardContent>

            <CardActions sx={{ justifyContent: 'flex-end' }}>
              <Button
                style={{ backgroundColor: 'white', color: 'black' }}
                onClick={() => addToCart(product)}
              >
                <AddShoppingCartIcon style={{ color: 'black' }} />
              </Button>
            </CardActions>
          </Card>
        </Grid>
      ))}
    </Grid>
  );
};

export default ProductList;
