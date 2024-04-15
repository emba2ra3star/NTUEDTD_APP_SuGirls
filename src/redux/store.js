import { configureStore } from '@reduxjs/toolkit';
import darkModeSlice from './darkModeSlice';

const store = configureStore({
  reducer: {
    darkMode:darkModeSlice
  },
  devTools: process.env.NODE_ENV !== 'production',
});

export default store;