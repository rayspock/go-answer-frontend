import { LogActionTypes, AnswerActionTypes, HistoryActionTypes } from './types';
import {
  ANSWER_REQUEST,
  UPDATE_ANSWER,
  CREATE_ANSWER,
  DELETE_ANSWER,
  SET_ERROR,
  HIDE_LOG,
  HISTORY_REQUEST,
  SET_INFO
} from "./../constants/action-types";
import { Answer } from '../reducers/types';

export function setError(error: Error): LogActionTypes {
  return {
    type: SET_ERROR,
    error: error
  }
}

export function setInfo(text: string): LogActionTypes {
  return {
    type: SET_INFO,
    payload: text
  }
}

export function hideLog(): LogActionTypes {
  return {
    type: HIDE_LOG
  }
}

export function getAnswers(key?: string): AnswerActionTypes {
  return {
    type: ANSWER_REQUEST,
    payload: key
  }
}

export function getHistories(key: string): HistoryActionTypes {
  return {
    type: HISTORY_REQUEST,
    payload: key
  }
}

export function createAnswer(answer: Answer): AnswerActionTypes {
  return {
    type: CREATE_ANSWER,
    payload: answer
  }
}

export function updateAnswer(answer: Answer): AnswerActionTypes {
  return {
    type: UPDATE_ANSWER,
    payload: answer
  }
}

export function deleteAnswer(key: string): AnswerActionTypes {
  return {
    type: DELETE_ANSWER,
    payload: key
  }
}