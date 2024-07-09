import React from 'react';
import {
  Card,
  CardContent,
  CardActions,
  CardMedia,
  Typography,
  Button,
  InputBase,
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
    const newQuantity = Math.min(product.quantities + 1, product.quantities);
    updateQuantity(product.id, newQuantity);
  };

  const decrementQuantity = () => {
    const newQuantity = Math.max(1, product.quantities - 1); // Ensure quantity doesn't go below 1
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
        <Typography variant="h6" style={{ fontFamily: 'JetBrains Mono, monospace',fontSize:'1rem' }}>{product.name}</Typography>
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
              minWidth: '30px',
              padding: '4px',
              backgroundColor: 'black',
              borderRadius: '50%', // Make the button circular
            }}
          >
            -
          </Button>
          <InputBase
            type="number"
            inputProps={{
              min: 1, // Set min directly in inputProps
              max: product.quantities,
              value: product.quantities,
              onChange: handleQuantityChange,
              style: {
                width: '45px',
                height: '45px',
                textAlign: 'center',
                margin: '0px 0px 0px 10px',
                border: '0px',
                padding: '4px',
                fontSize: '1rem',
              },
            }}
          />
          <Button
            variant="contained"
            size="small"
            onClick={incrementQuantity}
            sx={{
              color: 'white',
              minWidth: '30px',
              padding: '4px',
              backgroundColor: 'black',
              borderRadius: '50%', // Make the button circular
            }}
          >
            +
          </Button>
        </Box>
      </CardContent>
      <CardActions
        sx={{
          position: 'absolute',
          bottom: { xs: '85px', sm: 'auto', lg: '40px' },
          right: { xs: '0px', sm: 'auto', lg: '0px' },
          left: { xs: '230px', sm: 'auto', lg: '260px' },
        }}
      >
        <Button
          size="small"
          onClick={() => removeFromCart(product.id)}
          sx={{
            width: '30px',
            height: '30px',
            minWidth: '30px',
            borderRadius: '50%', // Make the button circular
            color: 'white',
          }}
        >
          ❌
        </Button>
      </CardActions>
    </Card>
  );
};

export default CartItem;
