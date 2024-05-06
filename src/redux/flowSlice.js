import { createSlice } from "@reduxjs/toolkit";

export const flowSlice = createSlice({
  name: "flow",
  initialState: {},
  reducers: {
    setFlow: (state, action) => {
      const { date, flow } = action.payload;
      state[date] = flow;   //讓每天都有一個儲存格
    }
  }
});

export const { setFlow } = flowSlice.actions;

export const selectFlow = (state, date) => state.flow[date];

export default flowSlice.reducer;