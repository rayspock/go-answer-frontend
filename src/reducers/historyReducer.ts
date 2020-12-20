import { HistoryState } from './types';
import { HISTORY_LOAD } from "../constants/action-types";
import { HistoryActionTypes } from "../actions/types";

const initialState = {
  histories: []
}

export function historyReducer(
  state: HistoryState = initialState,
  action: HistoryActionTypes): HistoryState {
  if (action.type === HISTORY_LOAD) {
    //Load data from remote server
    return Object.assign({}, state, {
      histories: action.payload
    });
  }
  return state;
}