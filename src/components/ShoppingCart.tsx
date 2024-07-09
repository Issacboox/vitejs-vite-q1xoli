import React, { useState, useEffect, useReducer } from 'react';
import {
  Container,
  Box,
  Typography,
  Grid,
  Button,
  TextField,
  Card,
  CardActions,
  CardContent,
  CardMedia,
} from '@mui/material';
import AddShoppingCartIcon from '@mui/icons-material/AddShoppingCart';
import CartItem from './CartItem';
import { Product, productsData } from '../types';
import useLocalStorage from '../hooks/useLocalStorage';
import cartReducer, { ActionType, initialState } from '../reducers/cartReducer';
import { debounce } from '../utils/debounce';
import Swal from 'sweetalert2';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const ShoppingCart: React.FC = () => {
  const [cartItems, setCartItems] = useLocalStorage<Product[]>('cartItems', []);
  const [cartState, dispatch] = useReducer(cartReducer, initialState);
  const [products, setProducts] = useState<Product[]>([]);
  const [filteredProducts, setFilteredProducts] = useState<Product[]>([]);
  const [searchTerm, setSearchTerm] = useState<string>('');
  const [currentHistoryIndex, setCurrentHistoryIndex] = useState(0);
  const [pastStates, setPastStates] = useState<Product[][]>([]);
  const [futureStates, setFutureStates] = useState<Product[][]>([]);

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        await new Promise((resolve) => setTimeout(resolve, 500));
        setProducts(productsData);
        setFilteredProducts(productsData);
      } catch (error) {
        console.error('Error fetching products:', error);
      }
    };

    fetchProducts();
  }, []);

  useEffect(() => {
    if (cartItems.length > 0) {
      dispatch({
        type: ActionType.INIT_CART_FROM_LOCAL_STORAGE,
        payload: cartItems,
      });
    }
  }, [cartItems]);

  const undo = () => {
    if (currentHistoryIndex > 0) {
      const previousIndex = currentHistoryIndex - 1;
      const previousState = pastStates[previousIndex];
      dispatch({ type: ActionType.UNDO, payload: previousState });
      setCurrentHistoryIndex(previousIndex);
      setFutureStates([cartState, ...futureStates]);
    }
  };

  const redo = () => {
    if (currentHistoryIndex < pastStates.length - 1) {
      const nextIndex = currentHistoryIndex + 1;
      const nextState = pastStates[nextIndex];
      dispatch({ type: ActionType.REDO, payload: nextState });
      setCurrentHistoryIndex(nextIndex);
      setPastStates([...pastStates, cartState]);
    }
  };

  const addToCart = (product) => {
    const cartProduct = cartState.find((item) => item.id === product.id);
  
    if (cartProduct && cartProduct.quantity >= product.quantities) {
      Swal.fire({
        html: `<img src="https://assets-v2.lottiefiles.com/a/b5641ed8-1152-11ee-ada0-8f4e8e17569e/AVXn9ghicT.gif" style="width: 170px;">
               <div style="font-family: 'JetBrains Mono', monospace; margin-top: 10px;">
                 Not enough stock
               </div>`,
        showConfirmButton: false,
        showCloseButton: true,
      });
      return;
    }
  
    dispatch({ type: ActionType.ADD_TO_CART, payload: product });
    setPastStates([...pastStates, cartState]);
    setCurrentHistoryIndex(currentHistoryIndex + 1);
    setFutureStates([]);
  
    toast.success('Added to cart successfully!', {
      position: 'top-right',
      autoClose: 3000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
      style: {
        fontFamily: 'JetBrains Mono, monospace',
      },
    });
  };

  const removeFromCart = (id: number) => {
    dispatch({ type: ActionType.REMOVE_FROM_CART, payload: id });
    setPastStates([...pastStates, cartState]);
    setCurrentHistoryIndex(currentHistoryIndex + 1);
    setFutureStates([]);
  };

  const updateQuantity = (id: number, quantity: number) => {
    dispatch({ type: ActionType.UPDATE_QUANTITY, payload: { id, quantity } });
    setPastStates([...pastStates, cartState]);
    setCurrentHistoryIndex(currentHistoryIndex + 1);
    setFutureStates([]);
  };

  const clearCart = () => {
    dispatch({ type: ActionType.CLEAR_CART });
    setPastStates([...pastStates, cartState]);
    setCurrentHistoryIndex(currentHistoryIndex + 1);
    setFutureStates([]);
  };

  const handleSearchChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const value = event.target.value.trim().toLowerCase();
    setSearchTerm(value);
    debounce(() => {
      if (value === '') {
        setFilteredProducts(products);
      } else {
        const filtered = products.filter((product) =>
          product.name.toLowerCase().includes(value)
        );
        setFilteredProducts(filtered);
      }
    }, 300)();
  };

  return (
    <Container maxWidth="lg">
      <Box sx={{ my: 4 }}>
      <Box
      sx={{
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'left',
        marginBottom: '20px',
      }}
    >
      <Typography 
        variant="subtitle1" 
        sx={{ 
          fontFamily: 'JetBrains Mono, monospace',
          marginBottom: '8px' 
        }}
      >
        Search
      </Typography>
      <TextField
        label=""
        variant="standard"
        value={searchTerm}
        onChange={handleSearchChange}
        fullWidth
        sx={{
          width: '300px',
          borderRadius: '20px',
          '& .MuiOutlinedInput-root': {
            borderRadius: '20px',
            fontFamily: 'JetBrains Mono, monospace'
          },
        }}
      />
    </Box>
        <Grid container spacing={3} sx={{ rowGap: '20px' }}>
          {/* Products Grid */}
          <Grid item xs={12} md={8}>
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
                        $
                        {product.price.toLocaleString('en-US', {
                          minimumFractionDigits: 2,
                          maximumFractionDigits: 2,
                        })}/Kilo
                      </Typography>
                      <Typography
                        variant="body2"
                        style={{
                          color: product.quantities < 10 ? 'red' : 'inherit',
                          fontFamily: 'JetBrains Mono, monospace',
                        }}
                      >
                        stock : {product.quantities}
                      </Typography>
                    </CardContent>

                    <CardActions sx={{ justifyContent: 'flex-end' }}>
                      <Button
                        variant=""
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
          </Grid>

          {/* Shopping Cart Grid */}
          <Grid item xs={12} md={4}>
            <Box
              sx={{
                display: 'flex',
                flexDirection: 'column',
                height: '100%',
                border: '1px solid #E1E1E1',
                padding: '20px',
                borderRadius: '10px',
              }}
            >
              <Typography
                variant="h6"
                style={{
                  textAlign: 'center',
                  textTransform: 'uppercase',
                  textAlign: 'center',
                  fontWeight: 'bold',
                  fontFamily: 'JetBrains Mono, monospace',
                }}
              >
                Shopping Cart 🧺
              </Typography>
              {cartState.length === 0 ? (
                <Typography
                  variant="body1"
                  sx={{
                    textAlign: 'center',
                    mt: 30,
                    color: 'grey',
                    fontFamily: 'JetBrains Mono, monospace',
                  }}
                >
                  Your cart is empty. Start adding products
                </Typography>
              ) : (
                <>
                  <Box
                    sx={{
                      flex: 1,
                      overflowY: 'auto',
                      mt: 2,
                      mb: 2,
                      maxHeight: '465px',
                      '&::-webkit-scrollbar': {
                        width: '4px', // width of the scrollbar
                      },
                      '&::-webkit-scrollbar-track': {
                        background: 'transparent', // color of the track
                      },
                      '&::-webkit-scrollbar-thumb': {
                        backgroundColor: '#888', // color of the thumb
                        borderRadius: '4px', // roundness of the thumb
                      },
                    }}
                  >
                    {cartState.map((product) => (
                      <CartItem
                        key={product.id}
                        product={product}
                        updateQuantity={updateQuantity}
                        removeFromCart={removeFromCart}
                      />
                    ))}
                  </Box>
                  <Typography
                    variant="h6"
                    sx={{
                      mt: 2,
                      alignSelf: 'flex-end',
                      fontFamily: 'JetBrains Mono, monospace',
                    }}
                  >
                    Total: $
                    {cartState
                      .reduce(
                        (acc, curr) => acc + curr.price * curr.quantity,
                        0
                      )
                      .toLocaleString('en-US', {
                        minimumFractionDigits: 2,
                        maximumFractionDigits: 2,
                      })}
                  </Typography>
                  <Box
                    sx={{
                      display: 'flex',
                      justifyContent: 'center',
                      width: '100%',
                      marginBottom: '10px',
                    }}
                  >
                    {/* Clear Cart button */}
                    <Button
                      variant="contained"
                      color="error"
                      onClick={() => clearCart()}
                      sx={{ flex: '12', borderRadius: '20px' }}
                      style={{ fontFamily: 'JetBrains Mono, monospace' }}
                    >
                      Clear Cart
                    </Button>
                  </Box>

                  <Box
                    sx={{
                      display: 'flex',
                      justifyContent: 'space-between',
                      width: '100%',
                    }}
                  >
                    {/* Undo button */}
                    <Button
                      onClick={undo}
                      disabled={currentHistoryIndex <= 0}
                      sx={{
                        flex: '6',
                        marginRight: '5px',
                        fontFamily: 'JetBrains Mono, monospace',
                      }}
                    >
                      Undo
                    </Button>

                    {/* Redo button */}
                    <Button
                      onClick={redo}
                      disabled={currentHistoryIndex >= pastStates.length - 1}
                      sx={{
                        flex: '6',
                        marginLeft: '5px',
                        fontFamily: 'JetBrains Mono, monospace',
                      }}
                    >
                      Redo
                    </Button>
                  </Box>
                </>
              )}
            </Box>
          </Grid>
        </Grid>
      </Box>
    </Container>
  );
};

export default ShoppingCart;
