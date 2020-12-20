import { takeLatest, call, put } from "redux-saga/effects";
import { HistoryActionTypes, AnswerActionTypes } from './../actions/types';
import {
  API_ERROR,
  HISTORY_LOAD,
  HISTORY_REQUEST,
  SET_ERROR,
  ANSWER_REQUEST,
  ANSWER_LOAD
} from "../constants/action-types";
import { Helper } from "../utils/helper";

export default function* watcherSage() {
  yield takeLatest(HISTORY_REQUEST, fetchHistory);
  yield takeLatest(ANSWER_REQUEST, fetchAnswer);
}

function* fetchAnswer(action: AnswerActionTypes) {
  try {
    const path = `/answer${(action.payload) ? "/" + action.payload : action.payload}`
    const payload = yield call(getData, path);
    if (Helper.typeof(payload) === "array") {
      yield put({ type: ANSWER_LOAD, payload: payload });
    } else if (Helper.typeof(payload) === "object") {
      yield put({ type: ANSWER_LOAD, payload: [payload] });
    } else {
      yield put({ type: SET_ERROR, error: new Error(payload.message) });
    }
  } catch (e) {
    yield put({ type: API_ERROR, error: e });
  }
}

function* fetchHistory(action: HistoryActionTypes) {
  try {
    const path = `/answer/${action.payload}/history`
    const payload = yield call(getData, path);
    if (Array.isArray(payload)) {
      yield put({ type: HISTORY_LOAD, payload });
    } else {
      yield put({ type: SET_ERROR, error: new Error(payload.message) });
    }
  } catch (e) {
    yield put({ type: API_ERROR, error: e });
  }
}

function getData(path: string): Promise<Response> {
  return fetch(`${process.env.REACT_APP_API}/api${path}`, {
    method: 'GET',
  }).then(response => {
    if (response.status !== 200) {
      throw new Error(`[${response.status}] Cannot retrieve data.`)
    }
    return response.json()
  });
}