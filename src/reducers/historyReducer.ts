import { Product, ActionType, CartItem } from '../types/index';
import { Action } from './actions';

export interface HistoryState {
  past: CartItem[][];
  present: CartItem[];
  future: CartItem[][];
}

export const initialHistoryState: HistoryState = {
  past: [],
  present: [],
  future: [],
};

const historyReducer = (
  state: HistoryState = initialHistoryState,
  action: Action
): HistoryState => {
  switch (action.type) {
    case ActionType.ADD_TO_CART:
    case ActionType.REMOVE_FROM_CART:
    case ActionType.UPDATE_QUANTITY:
      return {
        past: [...state.past, state.present],
        present: action.payload ? [...state.present] : state.present,
        future: [],
      };

    case ActionType.CLEAR_CART:
      return {
        past: [...state.past, state.present],
        present: [],
        future: [],
      };

    case ActionType.INIT_CART_FROM_LOCAL_STORAGE:
      return {
        past: [],
        present: action.payload,
        future: [],
      };

    default:
      return state;
  }
};

export default historyReducer;
