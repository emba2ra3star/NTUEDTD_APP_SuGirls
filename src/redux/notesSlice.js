import { createSlice } from "@reduxjs/toolkit";

export const notesSlice = createSlice({
  name: "notes",
  initialState: {},
  reducers: {
    setNote: (state, action) => {
      const { date, note } = action.payload;
      state[date] = note;   //讓每天都有一個儲存格
    }
  }
});

export const { setNote } = notesSlice.actions;

export const selectNote = (state, date) => state.notes[date];

export default notesSlice.reducer;