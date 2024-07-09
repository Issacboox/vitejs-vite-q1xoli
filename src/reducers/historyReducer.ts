import { ActionType, CartItem } from '../types';
import { Action } from './actions';

export interface HistoryState {
  past: CartItem[][];
  future: CartItem[][];
}

export const initialHistoryState: HistoryState = {
  past: [],
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
      // Push current state to past
      return {
        past: [...state.past, state.future],
        future: [],
      };

    case ActionType.UNDO:
      // Move last past state to future and set as new present
      const [newPresent, ...newPast] = state.past;
      return {
        past: newPast,
        future: [state.present, ...state.future],
      };

    case ActionType.REDO:
      // Move last future state to past and set as new present
      const [newFuture, ...newFuturePast] = state.future;
      return {
        past: [state.present, ...state.past],
        future: newFuture,
      };

    default:
      return state;
  }
};

export default historyReducer;
