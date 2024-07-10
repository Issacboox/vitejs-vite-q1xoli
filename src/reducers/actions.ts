import { Product, ActionType, CartItem } from '../types/index';


export type Action =
  | { type: ActionType.ADD_TO_CART; payload: Product }
  | { type: ActionType.REMOVE_FROM_CART; payload: number }
  | { type: ActionType.UPDATE_QUANTITY; payload: { id: number; quantity: number } }
  | { type: ActionType.CLEAR_CART }
  | { type: ActionType.INIT_CART_FROM_LOCAL_STORAGE; payload: CartItem[] };