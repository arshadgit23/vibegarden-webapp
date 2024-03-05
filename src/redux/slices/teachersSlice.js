import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  teachers: [],
};

const teachersSlice = createSlice({
  name: "teachers",
  initialState,
  reducers: {
    setTeachers: (state, action) => {
      state.teachers = action.payload;
    },
    resetTeachers: (state) => {
      state.teachers = [];
    },
    // setTeacherRC: (state, action) => {
    //   console.log("teacher rc", action.payload);
    //   state.relatedContent = [
    //     ...state?.relatedContent,
    //     {
    //       teacherId: action.payload.teacherId,
    //       relatedContent: action.payload.relatedContent,
    //     },
    //   ];
    // },
  },
});

export const { setTeachers, resetTeachers } = teachersSlice.actions;
export default teachersSlice.reducer;
