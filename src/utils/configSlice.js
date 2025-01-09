import { createSlice } from "@reduxjs/toolkit";

const congigSlice = createSlice({
    name:"config",
    initialState:{
        lang:"en",
    },
    reducers:{
        changeLanguage : (state, action) =>{
            state.lang = action.payload;
        },
    },
});

export const {changeLanguage} = congigSlice.actions;
export default congigSlice.reducer;