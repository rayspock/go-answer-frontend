import React from "react";
import { Store, AnyAction } from "redux";
import { Provider } from 'react-redux';
// react-testing-library renders your components to document.body,
// this adds jest-dom's custom assertions
import '@testing-library/jest-dom';
import { render, RenderResult } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import configureStore, { MockStoreEnhanced } from 'redux-mock-store';
import { LogLevel } from "../../../constants/enum";
import Notification from '../Notification';
import { hideLog } from "../../../actions";

const msg = "record not found"
const mockStore = configureStore([]);
const mock = (msg: string) => {
  return mockStore({
    log: {
      level: LogLevel.Error,
      text: msg,
      isOpen: true
    }
  });
};

function renderNotification(store: Store<any, AnyAction>) {
  return render(
    <Provider store={store}>
      <Notification />
    </Provider>
  );
}

describe('<Notification />', () => {
  let store: MockStoreEnhanced<unknown, {}>;
  let component: RenderResult;

  beforeEach(() => {
    store = mock(msg)
    store.dispatch = jest.fn();
    component = renderNotification(store)
  })

  afterEach(() => {
    jest.clearAllMocks();
  });

  afterAll(() => {
    jest.restoreAllMocks();
  });
  
  it(`button collapses the content`, () => {
    const msg = "record not found";

    expect(component.queryByText(msg)).toBeInTheDocument();

    const button = component.getByRole('button', { name: /close/i })
    userEvent.click(button);
    expect(store.dispatch).toHaveBeenCalledTimes(1);
    expect(store.dispatch).toHaveBeenCalledWith(
      hideLog()
    );
  });
});
