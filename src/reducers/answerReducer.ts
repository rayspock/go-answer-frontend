import { DELETE_ANSWER_SUCCESS, ANSWER_LOAD, CREATE_ANSWER_SUCCESS, UPDATE_ANSWER_SUCCESS } from './../constants/action-types';
import { AnswerState } from './types';
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
  if (action.type === DELETE_ANSWER_SUCCESS) {
    const index = state.answers.findIndex(value => value.key === action.payload);
    if (index !== -1) {
      return Object.assign({}, state, {
        answers: [
          ...state.answers.slice(0, index),
          ...state.answers.slice(index + 1, state.answers.length)
        ]
      });
    } else {
      console.warn("cannot find the answer:", action.payload)
    }
  }
  if (action.type === CREATE_ANSWER_SUCCESS) {
    return Object.assign({}, state, {
      answers: [...state.answers, action.payload]
    });
  }
  if (action.type === UPDATE_ANSWER_SUCCESS) {
    const newAnswers = state.answers.map((item, index) => {
      if (item.key !== action.payload.key) {
        return item;
      }
      return {
        ...item,
        ...action.payload
      }
    })
    return Object.assign({}, state, {
      answers: newAnswers
    });
  }
  return state;
}