import {
  Box,
  CssBaseline,
  ThemeProvider,
  Typography,
  AppBar,
  Toolbar,
} from '@mui/material';
import { theme } from './theme';
import ShoppingCart from './components/ShoppingCart';
import { ToastContainer } from 'react-toastify';


function App() {
  // // Initialize cart items from localStorage or mock data
  // const [cartItems, setCartItems] = useLocalStorage<CartItem[]>('cartItems', []);

  // const addToCart = (item: Product) => {
  //   const itemExists = cartItems.find((cartItem: CartItem) => cartItem.id === item.id);
  
  //   if (itemExists) {
  //     if (itemExists.quantity < item.stock) {
  //       const updatedCartItems = cartItems.map((cartItem: CartItem) =>
  //         cartItem.id === item.id
  //           ? { ...cartItem, quantity: cartItem.quantity + 1 }
  //           : cartItem
  //       );
  //       setCartItems(updatedCartItems);
  //     } else {
  //       toast.error('Not enough stock!', {
  //         position: 'top-right',
  //         autoClose: 3000,
  //         hideProgressBar: false,
  //         closeOnClick: true,
  //         pauseOnHover: true,
  //         draggable: true,
  //         progress: undefined,
  //         style: {
  //           fontFamily: 'JetBrains Mono, monospace',
  //         },
  //       });
  //     }
  //   } else {
  //     setCartItems([...cartItems, { ...item, quantity: 1 }]);
  //   }
  // };
  
  // const updateQuantity = (id: number, quantity: number) => {
  //   const updatedCartItems = cartItems.map((item: CartItem) =>
  //     item.id === id ? { ...item, quantity } : item
  //   );
  //   setCartItems(updatedCartItems);
  // };
  
  // const removeFromCart = (id: number) => {
  //   const updatedCartItems = cartItems.filter((item: CartItem) => item.id !== id);
  //   setCartItems(updatedCartItems);
  // };
  
  return (
    <Box sx={{ flexGrow: 1 }}>
      <ThemeProvider theme={theme}>
        <CssBaseline />
        <AppBar position="sticky" color="inherit" elevation={0}>
      <Toolbar>
        <Typography variant="h6" component="div" sx={{ flexGrow: 1, textTransform: 'uppercase', color: 'black', fontFamily: 'JetBrains Mono, monospace' }}>
          Test Metanet
        </Typography>
        <Typography variant="body2" color="inherit" style={{ fontFamily: 'JetBrains Mono, monospace' }}>
          NURARAT S. 🙋🏻‍♀️
        </Typography>
      </Toolbar>
    </AppBar>
        <Box sx={{ my: 4, fontFamily: 'JetBrains Mono, monospace' }}>
          <ShoppingCart/>
          <Box sx={{ mt: 'auto', pt: 4, textAlign: 'center' }}>
            <Typography variant="body2" color="textSecondary" style={{ fontFamily: 'JetBrains Mono, monospace' }}>
              NURARAT S. 🙋🏻‍♀️
            </Typography>
          </Box>
        </Box>
        <ToastContainer />
      </ThemeProvider>
    </Box>
  );
}

export default App;

/*
Create a shopping cart component using React hooks and TypeScript.

Requirements:
1. Use useState and useReducer hooks for state management.
2. The cart should display a list of items, each with a name, price, and quantity.
3. Implement functionality to add items, remove items, and update quantities.
4. Calculate and display the total price of all items in the cart.
5. Implement a custom hook called useLocalStorage to persist the cart state in localStorage.
6. Add a "Clear Cart" button that removes all items.
7. Implement error handling for invalid inputs (e.g., negative quantities).
8. Use TypeScript for type safety throughout the component.
9. Optimize performance using React.memo for child components where appropriate.
10. Add basic styling to make the cart visually appealing.

The main component should be named ShoppingCart. You may create additional sub-components as needed.

Bonus:
- Implement undo/redo functionality for cart actions.
- Add a debounced search input to filter items in the cart.

Project Structure:
src/
├── components/
│   ├── ShoppingCart.tsx
│   └── CartItem.tsx
├── hooks/
│   └── useLocalStorage.ts
├── reducers/
│   └── cartReducer.ts
├── types/
│   └── index.ts
├── utils/
│   └── debounce.ts (for bonus task)
└── App.tsx

Guidelines:
1. Start by implementing the basic types in types/index.ts.
2. Create the useLocalStorage hook in hooks/useLocalStorage.ts.
3. Implement the cart reducer in reducers/cartReducer.ts.
4. Create a CartItem component in components/CartItem.tsx.
5. Implement the main ShoppingCart component in components/ShoppingCart.tsx.
6. Use this App.tsx as the entry point for your application.

Good luck!
*/
