import { configureStore } from '@reduxjs/toolkit';
import darkModeSlice from './darkModeSlice';
import calendarReducer from './calendarReducer';

const store = configureStore({
  reducer: {
    darkMode:darkModeSlice,
    caledarInfo:calendarReducer
  },
  devTools: process.env.NODE_ENV !== 'production',
});

export default store;