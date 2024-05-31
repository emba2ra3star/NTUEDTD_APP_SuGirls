import { createSlice } from "@reduxjs/toolkit";

export const syndromesSlice = createSlice({
  name: "syndromes",
  initialState: {},
  reducers: {
    setMySyndromes: (state, action) => {
      const { date, syndromes } = action.payload;
      state[date] = syndromes;   //讓每天都有一個儲存格
    }
  }
});

export const { setMySyndromes } = syndromesSlice.actions;

export const selectMySyndromes = (state, date) => state.syndromes[date];

export default syndromesSlice.reducer;