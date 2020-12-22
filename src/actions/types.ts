import {
  API_ERROR, ANSWER_REQUEST, HISTORY_REQUEST,
  SET_ERROR, HIDE_LOG, ANSWER_LOAD,
  HISTORY_LOAD, SET_INFO, CREATE_ANSWER,
  UPDATE_ANSWER, DELETE_ANSWER,
  UPDATE_ANSWER_SUCCESS, DELETE_ANSWER_SUCCESS, CREATE_ANSWER_SUCCESS
} from './../constants/action-types'
import { Answer, History } from '../reducers/types'

interface AnswerLoadAction {
  type: typeof ANSWER_LOAD
  payload: Array<Answer>
}

interface AnswerRequestAction {
  type: typeof ANSWER_REQUEST
  payload?: string
}

interface CreateAnswerAction {
  type: typeof CREATE_ANSWER
  payload: Answer
}

interface CreateAnswerSuccessAction {
  type: typeof CREATE_ANSWER_SUCCESS
  payload: Answer
}

interface UpdateAnswerAction {
  type: typeof UPDATE_ANSWER
  payload: Answer
}

interface UpdateAnswerSuccessAction {
  type: typeof UPDATE_ANSWER_SUCCESS
  payload: Answer
}

interface DeleteAnswerAction {
  type: typeof DELETE_ANSWER
  payload: string
}
interface DeleteAnswerSuccessAction {
  type: typeof DELETE_ANSWER_SUCCESS
  payload: string
}

interface HistoryLoadAction {
  type: typeof HISTORY_LOAD
  payload: Array<History>
}

interface HistoryRequestAction {
  type: typeof HISTORY_REQUEST
  payload: string
}

interface ApiErrorAction {
  type: typeof API_ERROR
  error: Error
}

interface SetInfoAction {
  type: typeof SET_INFO
  payload: string
}

interface SetErrorAction {
  type: typeof SET_ERROR
  error: Error
}

interface HideInfoAction {
  type: typeof HIDE_LOG
}

export type AnswerActionTypes = AnswerLoadAction | AnswerRequestAction |
  CreateAnswerAction | CreateAnswerSuccessAction |
  UpdateAnswerAction | UpdateAnswerSuccessAction |
  DeleteAnswerAction | DeleteAnswerSuccessAction
export type HistoryActionTypes = HistoryLoadAction | HistoryRequestAction
export type LogActionTypes = ApiErrorAction | SetErrorAction | HideInfoAction | SetInfoAction