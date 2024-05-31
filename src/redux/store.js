import { configureStore } from '@reduxjs/toolkit';
import darkModeSlice from './darkModeSlice';
import notesReducer  from "./notesSlice";
import selectedDateReducer from "./selectedDateSlice";
import flowReducer from "./flowSlice"
import painDegreeReducer from "./painDegreeSlice"
import syndromesReducer from './syndromesSlice';
import analyzedataReducer from './analyzedataSlice';

const store = configureStore({
  reducer: {
    darkMode:darkModeSlice,
    selectedDate: selectedDateReducer,
    notes: notesReducer,
    flow: flowReducer,
    painDegree:painDegreeReducer,
    analyzedata:analyzedataReducer,
    syndromes:syndromesReducer,
  },
  devTools: process.env.NODE_ENV !== 'production',
});

export default store;
