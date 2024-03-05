import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  scheduleVG: {},
};

const scheduleVG = createSlice({
  name: "scheduleVG",
  initialState,
  reducers: {
    getScheduleVG: (state, action) => {
      const scheduleVG = action.payload;
      state.scheduleVG = scheduleVG;
    },
  },
});

export const { getScheduleVG } = scheduleVG.actions;
export default scheduleVG.reducer;
