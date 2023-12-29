import { createSlice } from "@reduxjs/toolkit";

const musicSlice = createSlice({
    name: "music",
    initialState: {
        homeData: [],
    },
    reducers: {
        setHomeData: (state, action) => {
            state.homeData = action.payload;
        },
    },
});

export const { setHomeData } = musicSlice.actions;
export default musicSlice.reducer;
