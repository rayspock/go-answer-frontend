import { combineReducers } from 'redux';
import { answerReducer } from './answerReducer';
import { logReducer } from './logReducer';
import { historyReducer } from './historyReducer';
import { AnswerState, LogState, HistoryState } from './types';

export interface AppState {
  answer: AnswerState
  history: HistoryState
  log: LogState
}

const rootReducer = combineReducers<AppState>({
  answer: answerReducer,
  history: historyReducer,
  log: logReducer
});

export default rootReducer;