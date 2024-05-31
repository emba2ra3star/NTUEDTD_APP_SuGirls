import { createSlice } from "@reduxjs/toolkit";
export const analyzedataSlice = createSlice({
  name: "analyzedata",
  initialState: {},
  reducers: {
    setanalyzedata:(state, action) =>{
        const { month, data } = action.payload;
        state[month] = data;  //data={start,end}
    }
  }
});

export const { setanalyzedata } = analyzedataSlice.actions;

export const selectanalyzedata = (state, month) => state.analyzedata[month];

export default analyzedataSlice.reducer;