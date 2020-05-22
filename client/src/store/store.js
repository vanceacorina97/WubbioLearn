import * as React from 'react';
import { createContext, useReducer } from 'react';
import { set } from 'lodash';

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

    if (status === 'start') {
      return set(nextState, storePath, { status: 'running' });
    }

    if (status === 'success') {
      return set(nextState, storePath, {
        status: 'done',
        data: payload,
        error: undefined,
      });
    }

    if (status === 'error') {
      return set(nextState, storePath, {
        status: 'failed',
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