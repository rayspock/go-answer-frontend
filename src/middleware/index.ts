import { AnswerActionTypes } from './../actions/types';
import { HISTORY_LOAD, ANSWER_LOAD } from './../constants/action-types';
import { HistoryActionTypes } from "../actions/types";
import { Dispatch } from "redux";
import { HISTORY_REQUEST } from "../constants/action-types";
import { StringUtil } from "../utils/stringUtil";
import { setError, setInfo } from "../actions";

interface MiddlewareProps {
  dispatch: Dispatch
}

export function MainMiddleware({ dispatch }: MiddlewareProps) {
  return function (next: Function) {
    return function (action: HistoryActionTypes | AnswerActionTypes) {
      if (action.type === HISTORY_REQUEST) {
        const { payload } = action;
        if (StringUtil.isNullOrEmpty(payload)) {
          return dispatch(setError(new Error("Answer key is required")));
        }
      }
      if (action.type === HISTORY_LOAD) {
        const { payload } = action;
        if (payload.length <= 0) {
          dispatch(setInfo("No records found"));
        }
      }
      if (action.type === ANSWER_LOAD) {
        const { payload } = action;
        if (payload.length <= 0) {
          dispatch(setInfo("No records found"));
        }
      }
      return next(action);
    }
  }
}