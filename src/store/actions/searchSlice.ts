import { createSlice } from "@reduxjs/toolkit";

const searchSlice = createSlice({
    name: "search",
    initialState: {
        showSearch: false,
        showMenu: false,
    },
    reducers: {
        setShowSearch: (state, action) => {
            state.showSearch = action.payload;
        },
        setShowMenu: (state, action) => {
            state.showMenu = action.payload;
        },
    },
});

export const { setShowSearch, setShowMenu } = searchSlice.actions;
export default searchSlice.reducer;
