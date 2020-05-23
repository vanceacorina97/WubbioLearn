import * as React from 'react';
import { createContext, useReducer } from 'react';
import { set } from 'lodash';
import * as constants from './constants';

const INITIAL_STATE = {};

const store = createContext(INITIAL_STATE);
const { Provider } = store;

const StateProvider = ({ children }) => {

  const reducer = (currentState, action) => {
    const { type, payload } = action;

    const storePathKeys = type.split('-');

    const status = storePathKeys.pop(); // start, success, error

    const storePath = storePathKeys.join('.');
    const nextState = { ...currentState };

    if (status === constants.STATUS_START) {
      return set(nextState, storePath, { status: constants.ACTION_STATUS_RUNNING });
    }

    if (status === constants.STATUS_SUCCESS) {
      return set(nextState, storePath, {
        status: constants.ACTION_STATUS_DONE,
        data: payload,
        error: undefined,
      });
    }

    if (status === constants.STATUS_ERROR) {
      return set(nextState, storePath, {
        status: constants.ACTION_STATUS_FAILED,
        data: undefined,
        error: payload,
      });
    }

    return currentState;
  };

  const [state, dispatch] = useReducer(reducer, INITIAL_STATE);

  return <Provider value={{ state, dispatch }}>{children}</Provider>;
};

export { store, StateProvider }