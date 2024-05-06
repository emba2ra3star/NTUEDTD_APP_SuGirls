import { configureStore } from '@reduxjs/toolkit';
import darkModeSlice from './darkModeSlice';
import notesReducer  from "./notesSlice";
import selectedDateReducer from "./selectedDateSlice";

const store = configureStore({
  reducer: {
    darkMode:darkModeSlice,
    selectedDate: selectedDateReducer,
    notes: notesReducer,
  },
  devTools: process.env.NODE_ENV !== 'production',
});

export default store;