import { ActionType } from '../types/index';
import CartItem from '../components/CartItem';

export type Action =
  | { type: ActionType.ADD_TO_CART; payload: CartItem }
  | { type: ActionType.REMOVE_FROM_CART; payload: number }
  | { type: ActionType.UPDATE_QUANTITY; payload: { id: number; quantity: number } }
  | { type: ActionType.CLEAR_CART }
  | { type: ActionType.UNDO }
  | { type: ActionType.REDO }
  | { type: ActionType.INIT_CART_FROM_LOCAL_STORAGE; payload: CartItem[] };

export { CartItem }; // Ensure CartItem is properly exported from '../components/CartItem'
