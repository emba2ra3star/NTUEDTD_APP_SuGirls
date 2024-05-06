import { createSlice } from "@reduxjs/toolkit";

export const selectedDateSlice = createSlice({
  name: "selectedDate",
  initialState: null,
  reducers: {
    setSelectedDate: (state, action) => {
      return action.payload;    // 可以存起來
    }
  }
});

export const { setSelectedDate } = selectedDateSlice.actions;

export const selectSelectedDate = (state) => state.selectedDate;

export default selectedDateSlice.reducer;