import { PayloadAction, createSlice } from "@reduxjs/toolkit";

type PlayerStateTypes = {
    isPlaying: boolean;
    isDarkMode: boolean;
};

const initialState: PlayerStateTypes = {
    isPlaying: false,
    isDarkMode: false,
};

const playerSlice = createSlice({
    name: "player",
    initialState,
    reducers: {
        setIsPlaying: (state, action: PayloadAction<boolean>) => {
            state.isPlaying = action.payload;
        },
        toggleDarkMode: (state, action: PayloadAction<boolean>) => {
            state.isDarkMode = action.payload;
        },
    },
});

export const { setIsPlaying, toggleDarkMode } = playerSlice.actions;
export default playerSlice.reducer;
