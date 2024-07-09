import React from 'react';
import {
  Card,
  CardContent,
  CardActions,
  CardMedia,
  Typography,
  Button,
  InputBase,
  useMediaQuery,
  Box,
} from '@mui/material';
import { Product } from '../types';

type CartItemProps = {
  product: Product;
  updateQuantity: (id: number, quantity: number) => void;
  removeFromCart: (id: number) => void;
};

const CartItem: React.FC<CartItemProps> = ({
  product,
  updateQuantity,
  removeFromCart,
}) => {
  const incrementQuantity = () => {
    const newQuantity = Math.min(product.quantity + 1, product.quantities);
    updateQuantity(product.id, newQuantity);
  };

  const isSmallScreen = useMediaQuery('(max-width:600px)');

  const decrementQuantity = () => {
    const newQuantity = Math.max(1, product.quantity - 1); // Ensure quantity doesn't go below 1
    updateQuantity(product.id, newQuantity);
  };

  const handleQuantityChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    let newQuantity = parseInt(event.target.value, 10);
    // Validate against product quantities
    newQuantity = Math.min(newQuantity, product.quantities);
    // Ensure quantity doesn't go below 1
    newQuantity = Math.max(1, newQuantity);
    updateQuantity(product.id, newQuantity);
  };

  return (
    <Card
    sx={{
      display: 'flex',
      marginBottom: '10px',
      width: '99%',
      borderRadius: '20px',
      position: 'relative',
    }}
  >
    <CardMedia
      component="img"
      sx={{ width: 110, objectFit: 'cover' }}
      image={product.img}
      alt={product.name}
    />
    <CardContent sx={{ flex: '1 0 auto' }}>
      <Typography variant="h6" style={{ fontFamily: 'JetBrains Mono, monospace' }}>{product.name}</Typography>
      <Typography variant="body2" color="text.secondary" style={{ fontFamily: 'JetBrains Mono, monospace' }}>
        ${product.price.toFixed(2)}
      </Typography>
      <Box
        sx={{ display: 'flex', alignItems: 'center', marginTop: '5px' }}
      >
        <Button
          variant="contained"
          size="small"
          onClick={decrementQuantity}
          sx={{
            marginLeft: '5px',
            color: 'white',
            minWidth: '20px',
            padding: '4px',
            backgroundColor: 'black',
          }}
        >
          -
        </Button>
        <InputBase
          type="number"
          min="1"
          max={product.quantities}
          value={product.quantity}
          onChange={handleQuantityChange}
          sx={{
            width: '45px',
            textAlign: 'center',
            margin: '0px 0px 0px 10px',
            border: '0px',
            borderRadius: '4px',
          }}
          inputProps={{
            style: {
              padding: '4px',
              textAlign: 'center',
              fontSize: '0.875rem',
            },
          }}
        />
        <Button
          variant="contained"
          size="small"
          onClick={incrementQuantity}
          sx={{
            color: 'white',
            minWidth: '20px',
            padding: '4px',
            backgroundColor: 'black',
          }}
        >
          +
        </Button>
      </Box>
    </CardContent>
    <CardActions
      sx={{
        position: 'absolute',
        bottom: { xs: '35px', sm: 'auto',lg:'10px' },
        right: { xs: '0px', sm: 'auto',lg:'10px' },
        left:{xs:'210px'}
      }}
    >
      <Button size="small" onClick={() => removeFromCart(product.id)}>
        ❌
      </Button>
    </CardActions>
  </Card>
  );
};

export default CartItem;
