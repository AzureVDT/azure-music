import { PayloadAction, createSlice } from "@reduxjs/toolkit";

type SearchStateTypes = {
    showSearch: boolean;
    showMenu: boolean;
};

const initialState: SearchStateTypes = {
    showSearch: false,
    showMenu: false,
};

const searchSlice = createSlice({
    name: "search",
    initialState,
    reducers: {
        setShowSearch: (state, action: PayloadAction<boolean>) => {
            state.showSearch = action.payload;
        },
        setShowMenu: (state, action: PayloadAction<boolean>) => {
            state.showMenu = action.payload;
        },
    },
});

export const { setShowSearch, setShowMenu } = searchSlice.actions;
export default searchSlice.reducer;
