import { takeLatest, call, put } from "redux-saga/effects";
import {
  API_ERROR,
  HISTORY_LOAD,
  HISTORY_REQUEST,
  SET_ERROR,
  ANSWER_REQUEST,
  ANSWER_LOAD,
  CREATE_ANSWER,
  UPDATE_ANSWER,
  DELETE_ANSWER,
  SET_INFO,
  DELETE_ANSWER_SUCCESS,
  CREATE_ANSWER_SUCCESS,
  UPDATE_ANSWER_SUCCESS
} from './../constants/action-types';
import { HistoryActionTypes, AnswerActionTypes } from './../actions/types';
import { Helper } from "../utils/helper";

export default function* watcherSage() {
  yield takeLatest(HISTORY_REQUEST, fetchHistory);
  yield takeLatest(ANSWER_REQUEST, fetchAnswer);
  yield takeLatest(CREATE_ANSWER, createAnswer);
  yield takeLatest(UPDATE_ANSWER, updateAnswer);
  yield takeLatest(DELETE_ANSWER, deleteAnswer);
}

function* fetchAnswer(action: AnswerActionTypes) {
  try {
    const path = `/answer${(action.payload) ? "/" + action.payload : action.payload}`
    const response = yield call(getData, path);
    if (Helper.typeof(response) === "array") {
      yield put({ type: ANSWER_LOAD, payload: response });
    } else if (Helper.typeof(response) === "object") {
      yield put({ type: ANSWER_LOAD, payload: [response] });
    } else {
      yield put({ type: SET_ERROR, error: new Error(response.message) });
    }
  } catch (e) {
    yield put({ type: API_ERROR, error: e });
  }
}

function* createAnswer(action: AnswerActionTypes) {
  try {
    const path = `/answer`
    const response = yield call(postData, "POST", path, action.payload);
    if (response === "success") {
      yield put({ type: SET_INFO, payload: "answer created" });
      yield put({ type: CREATE_ANSWER_SUCCESS, payload: action.payload })
    } else {
      yield put({ type: SET_ERROR, error: new Error(response.message) });
    }
  } catch (e) {
    yield put({ type: API_ERROR, error: e });
  }
}

function* updateAnswer(action: AnswerActionTypes) {
  try {
    const { payload } = action;
    if (payload && typeof payload !== "string" && "key" in payload) {
      const path = `/answer/${payload.key}`
      const response = yield call(postData, "PUT", path, {
        value: payload.value
      });
      if (response === "success") {
        yield put({ type: SET_INFO, payload: "answer updated" });
        yield put({ type: UPDATE_ANSWER_SUCCESS, payload: action.payload })
      } else {
        yield put({ type: SET_ERROR, error: new Error(response.message) });
      }
    } else {
      console.error("unsupported payload:", payload);
    }
  } catch (e) {
    yield put({ type: API_ERROR, error: e });
  }
}

function* deleteAnswer(action: AnswerActionTypes) {
  try {
    const path = `/answer/${action.payload}`
    const response = yield call(postData, "DELETE", path, undefined);
    if (response === "success") {
      yield put({ type: SET_INFO, payload: "answer deleted" });
      yield put({ type: DELETE_ANSWER_SUCCESS, payload: action.payload })
    } else {
      yield put({ type: SET_ERROR, error: new Error(response.message) });
    }
  } catch (e) {
    yield put({ type: API_ERROR, error: e });
  }
}

function* fetchHistory(action: HistoryActionTypes) {
  try {
    const path = `/answer/${action.payload}/history`
    const response = yield call(getData, path);
    if (Helper.typeof(response) === "array") {
      yield put({ type: HISTORY_LOAD, payload: response });
    } else {
      yield put({ type: SET_ERROR, error: new Error(response.message) });
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
      throw new Error(`[${response.status}] not found!`)
    }
    const contentType = response.headers.get("content-type");
    if (contentType && contentType.indexOf("application/json") !== -1) {
      return response.json()
    } else {
      return response.text()
    }
  });
}

function postData(method: string, path: string, payload?: any): Promise<Response> {
  const body = (payload) ? JSON.stringify(payload) : "";
  return fetch(`${process.env.REACT_APP_API}/api${path}`, {
    method: method,
    headers: {
      'Accept': 'application/json',
      'Content-Type': 'application/json'
    },
    body: body
  }).then(response => {
    if (response.status !== 200) {
      throw new Error(`[${response.status}] something went wrong!`)
    }
    const contentType = response.headers.get("content-type");
    if (contentType && contentType.indexOf("application/json") !== -1) {
      return response.json()
    } else {
      return response.text()
    }
  });
}