import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  loading: false,
  user: {},
};

export const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    getUserStatus: (state) => {
      state.loading = true;
    },
    setUserLoginDetails: (state, action) => {
      state.user = action.payload;
      state.loading = false;
    },

    setSignOutState: (state) => {
      state.user = {};
    },
  },
});

export const { getUserStatus, setUserLoginDetails, setSignOutState } =
  userSlice.actions;
export const selectUserDetails = (state) => state.user;
export default userSlice.reducer;
