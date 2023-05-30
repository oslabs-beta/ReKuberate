import { configureStore } from '@reduxjs/toolkit';
import appReducer from './appSlice';

const store = configureStore({
  reducer: {
    app: appReducer,
  },
});

export default store;
