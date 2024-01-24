import { PayloadAction, createSlice } from "@reduxjs/toolkit";
import { User } from "firebase/auth";

const initialState = {
    user: {},
};

const userSlice = createSlice({
    name: "auth",
    initialState,
    reducers: {
        setUser: (state, action: PayloadAction<User>) => {
            state.user = action.payload;
        },
    },
});

export const { setUser } = userSlice.actions;
export default userSlice.reducer;
