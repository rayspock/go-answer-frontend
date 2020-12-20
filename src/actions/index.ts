import { LogActionTypes, AnswerActionTypes, HistoryActionTypes } from './types';
import { ANSWER_REQUEST, SET_ERROR, HIDE_LOG, HISTORY_REQUEST, SET_INFO } from "../constants/action-types";

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