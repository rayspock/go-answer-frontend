import { AnswerState } from './types';
import { ANSWER_LOAD } from "../constants/action-types";
import { AnswerActionTypes } from "../actions/types";

const initialState = {
  answers: []
}

export function answerReducer(
  state: AnswerState = initialState,
  action: AnswerActionTypes): AnswerState {
  if (action.type === ANSWER_LOAD) {
    //Load data from remote server
    return Object.assign({}, state, {
      answers: action.payload
    });
  }
  return state;
}