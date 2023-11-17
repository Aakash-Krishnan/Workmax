import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  loading: false,
  tasks: [],
};

export const taskSlice = createSlice({
  name: "tasks",
  initialState,
  reducers: {
    fetchUserTasks: (state) => {
      state.loading = true;
    },
    getUserTasks: (state, action) => {
      state.tasks = action.payload;
      state.loading = false;
    },
  },
});

export const { getUserTasks } = taskSlice.actions;
export default taskSlice.reducer;
