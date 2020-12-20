import { SET_ERROR, HIDE_LOG, API_ERROR, SET_INFO } from '../constants/action-types';
import { LogActionTypes } from '../actions/types';
import { LogState } from './types';
import { LogLevel } from '../constants/enum';
const initState = {
  level: undefined,
  text: undefined,
  isOpen: false
};

export function logReducer(state: LogState = initState, action: LogActionTypes): LogState {
  if (action.type === HIDE_LOG) {
    return {
      level: undefined,
      text: undefined,
      isOpen: false
    }
  }
  if (action.type === SET_INFO) {
    return {
      level: LogLevel.Info,
      text: action.payload,
      isOpen: true
    }
  }
  if (action.type === API_ERROR || action.type === SET_ERROR) {
    if (action.error) {
      console.error(action.error);
      return {
        level: LogLevel.Error,
        text: action.error.message,
        isOpen: true
      }
    }
  }
  return state;
}