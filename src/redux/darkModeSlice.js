import { createSlice } from "@reduxjs/toolkit"

const initialState={colorMode:"light"}

const darkModeSlice = createSlice(
    {
        name:"darkMode",
        initialState,
        reducers:{
            toggleColorMode:(state)=>{state.colorMode = state.colorMode ==="light" ? "dark":"light"}
        }
    }
);

export const selectColorMode=(state)=>state.darkMode.colorMode;
export const {toggleColorMode}=darkModeSlice.actions;
export default darkModeSlice.reducer;