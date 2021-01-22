import {configureStore } from '@reduxjs/toolkit';

import appReducer from './appReducer'
import komReducer from './komReducer'
import guestReducer from './guestReducer'

export default configureStore({

  reducer: {
    appReducer: appReducer,
    komReducer:komReducer,
    guestReducer:guestReducer
  },

});