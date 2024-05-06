import { createSlice } from "@reduxjs/toolkit";

export const painDegreeSlice = createSlice({
  name: "painDegree",
  initialState: {},
  reducers: {
    setPainDegree: (state, action) => {
      const { date, painDegree } = action.payload;
      state[date] = painDegree;   //讓每天都有一個儲存格
    }
  }
});

export const { setPainDegree } = painDegreeSlice.actions;

export const selectPainDegree = (state, date) => state.painDegree[date];

export default painDegreeSlice.reducer;