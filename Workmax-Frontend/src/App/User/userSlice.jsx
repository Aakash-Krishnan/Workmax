import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  loading: false,
  user: {},
  currentUser: {},
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
    getCurrentUserDetails: (state, action) => {
      state.currentUser = action.payload;
    },

    setSignOutState: (state) => {
      state.user = {};
    },
  },
});

export const {
  getUserStatus,
  setUserLoginDetails,
  getCurrentUserDetails,
  setSignOutState,
} = userSlice.actions;

export const selectUserDetails = (state) => state.user;
export const selectCurentUserDetails = (state) => state.currentUser;
export default userSlice.reducer;
