import { LogLevel } from "../constants/enum";

export interface Answer {
  key: string
  value: string
}

export interface History {
  event: string
  data: Answer
}

export interface AnswerState {
  answers: Array<Answer>
}

export interface HistoryState {
  histories: Array<History>
}

export interface LogState {
  level?: LogLevel 
  text?: string
  isOpen: boolean
}