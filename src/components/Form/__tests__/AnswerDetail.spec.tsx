
import React from "react";
import { Route, Router } from "react-router-dom";
import { createBrowserHistory, History } from "history";
// react-testing-library renders your components to document.body,
// this adds jest-dom's custom assertions
import '@testing-library/jest-dom';
import { render, RenderResult, waitFor } from "@testing-library/react";
import userEvent from '@testing-library/user-event'
import AnswerDetail, { AnswerDetailProps, AnswerLocationState } from "../AnswerDetail";
import { Answer } from "../../../reducers/types";

let documentBody: RenderResult;
const history = createBrowserHistory<AnswerLocationState>();

function renderAnswerDetail(history: History<AnswerLocationState>, path: string, props: Partial<AnswerDetailProps> = {}) {
  const defaultProps: AnswerDetailProps = {
    isEditMode: false,
    title: "create",
    onBottomButtonClick: (answer: Answer) => {
      return;
    }
  }

  return render(
    <Router history={history}>
      <Route path={path}>
        <AnswerDetail {...defaultProps} {...props} />
      </Route>
    </Router>
  )
}

describe('<AnswerDetail />', () => {

  it('have empty form values', () => {
    const route = "/answer/new"
    history.push(route)
    documentBody = renderAnswerDetail(history, route);
    const inputKey = documentBody.getByTestId("answer-input-key") as HTMLInputElement
    const inputValue = documentBody.getByTestId("answer-input-value") as HTMLInputElement
    const button = documentBody.getByTestId("bottom-button-primary")
    const answerForm = documentBody.getByTestId("answer-form")
    expect(button).toHaveTextContent("create")
    expect(inputKey.value).toBe("");
    expect(inputValue.value).toBe("");
    expect(answerForm).toHaveFormValues({
      key: "",
      value: ""
    });
  });

  it('have form values, with Key input field disabled', () => {
    const route = "/answer/name/edit";
    const path = "/answer/:answerKey/edit";
    history.push(route, {
      answerValue: "John"
    })
    const updateProps: AnswerDetailProps = {
      isEditMode: true,
      title: "update",
      onBottomButtonClick: (answer: Answer) => {
        return;
      }
    }
    documentBody = renderAnswerDetail(history, path, updateProps);
    const inputKey = documentBody.getByTestId("answer-input-key") as HTMLInputElement
    const inputValue = documentBody.getByTestId("answer-input-value") as HTMLInputElement
    const button = documentBody.getByTestId("bottom-button-primary")
    expect(button).toHaveTextContent("update");
    expect(inputKey.disabled).toBe(true); // Expect Key input field disabled
    expect(inputKey.value).toBe("name");
    expect(inputValue.value).toBe("John");
  });

  it('submits key and value',async () => {
    const key = 'name';
    const value = 'John';
    const onSubmit = jest.fn();
    const route = "/answer/new"
    history.push(route)
    const props: AnswerDetailProps = {
      isEditMode: false,
      title: "create",
      onBottomButtonClick: onSubmit
    }
    documentBody = renderAnswerDetail(history, route, props);
    const inputKey = documentBody.getByTestId("answer-input-key") as HTMLInputElement
    const inputValue = documentBody.getByTestId("answer-input-value") as HTMLInputElement
    const button = documentBody.getByTestId("bottom-button-primary")

    userEvent.type(inputKey, key);
    userEvent.type(inputValue, value);
    userEvent.click(button);

    // To allow Jest to wait for the Formik component to call its own onSubmit.
    await waitFor(() => {
      expect(onSubmit).toHaveBeenCalledTimes(1);
      expect(onSubmit).toHaveBeenCalledWith({
        key,
        value
      });
    });
  });
});