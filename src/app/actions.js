import { createActions } from 'redux-actions';

import {
  PUSH_MESSAGE,
  POP_MESSAGE,
} from './actionTypes';

export const {
  pushMessage,
  popMessage,
} = createActions({
  [PUSH_MESSAGE] : (messages) => ({
    messages,
  }),

  [POP_MESSAGE] : () => {},
});
