import { configureStore } from '@reduxjs/toolkit';
import darkModeSlice from './darkModeSlice';
import notesReducer  from "./notesSlice";
import selectedDateReducer from "./selectedDateSlice";
import flowReducer from "./flowSlice";
import painDegreeReducer from './painDegreeSlice';

const store = configureStore({
  reducer: {
    darkMode:darkModeSlice,
    selectedDate: selectedDateReducer,
    notes: notesReducer,
    flow:flowReducer,
    painDegree:painDegreeReducer,
  },
  devTools: process.env.NODE_ENV !== 'production',
});

export default store;