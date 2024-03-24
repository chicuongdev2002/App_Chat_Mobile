import { configureStore } from '@reduxjs/toolkit';
import accountReducer from './slice';

const store = configureStore({
  reducer: {
    account: accountReducer,
  },
});

export default store;