import { ActionType, CartItem } from '../types';
import { Action } from './actions';


export const initialState: CartItem[] = [];

const cartReducer = (
  state: CartItem[] = initialState,
  action: Action
): CartItem[] => {
  let newState;
  switch (action.type) {
    case ActionType.ADD_TO_CART:
      const existingItem = state.find((item) => item.id === action.payload.id);
      if (existingItem) {
        newState = state.map((item) =>
          item.id === action.payload.id
            ? { ...item, quantity: item.quantity + 1 }
            : item
        );
      } else {
        newState = [...state, { ...action.payload, quantity: 1 }];
      }
      break;

    case ActionType.REMOVE_FROM_CART:
      newState = state.filter((item) => item.id !== action.payload);
      break;

    case ActionType.UPDATE_QUANTITY:
      newState = state.map((item) =>
        item.id === action.payload.id
          ? { ...item, quantity: action.payload.quantity }
          : item
      );
      break;

    case ActionType.CLEAR_CART:
      newState = [];
      break;

    case ActionType.UNDO:
      // Handle undo action
      newState = state; // Placeholder, replace with actual logic
      break;

    case ActionType.REDO:
      // Handle redo action
      newState = state; // Placeholder, replace with actual logic
      break;

    default:
      newState = state;
  }

  return newState;
};

export default cartReducer;
export { ActionType };
