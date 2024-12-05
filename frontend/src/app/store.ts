import { configureStore } from '@reduxjs/toolkit';
import { passwordReducer } from '../features/passwordSlice.ts';

export const store = configureStore({
  reducer: {
    password: passwordReducer
  }
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;