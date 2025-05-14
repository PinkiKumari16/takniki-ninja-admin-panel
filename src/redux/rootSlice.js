import { createSlice } from "@reduxjs/toolkit";
const rootSlice = createSlice({
  name: "root",
  initialState: {
    blogData: [],
    courseData: [],
    loading: false,
    isReloadData: false,
    selectedEditBlogData: null,
    selectedEditCourseData: null,
    activeTab: "Home",
  },
  reducers: {
    showLoading: (state, action) => {
      state.loading = true;
    },
    hideLoading: (state, action) => {
      state.loading = false;
    },
    setBlogData: (state, action) => {
      state.blogData = action.payload;
    },
    setCourseData: (state, action) => {
      state.courseData = action.payload;
    },
    setReloadData: (state, action) => {
      state.isReloadData = action.payload;
    },
    setSelectedEditBlogData: (state, action) => {
      state.selectedEditBlogData = action.payload;
    },
    setSelectedEditCourseData: (state, action) => {
      state.selectedEditCourseData = action.payload;
    },
    setActiveTab: (state, action) => {
      state.activeTab = action.payload;
    },
  },
});

export default rootSlice.reducer;
export const {
  showLoading,
  hideLoading,
  setBlogData,
  setReloadData,
  setSelectedEditBlogData,
  setSelectedEditCourseData,
  setActiveTab,
  setCourseData,
} = rootSlice.actions;
