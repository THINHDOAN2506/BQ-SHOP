import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { CommentsAPIs } from "../../../apis/commentApi";

const initialState = {
  comments: [],
};

export const actCreateNewCommment = createAsyncThunk(
  "comments/actCreateNewCommment",
  async ({ commentInfo, productId }, thunkApi) => {
    try {
      await CommentsAPIs.createComment(commentInfo);
      thunkApi.dispatch(actFetchAllComments({ productId: productId }));
    } catch (error) {}
  }
);

export const actFetchAllComments = createAsyncThunk(
  "comments/actFetchAllComments",
  async (params = {}) => {
    const response = await CommentsAPIs.getAllComments(params);
    return response;
  }
);

export const commentSlice = createSlice({
  name: "comments",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(actFetchAllComments.fulfilled, (state, action) => {
      state.comments = action.payload;
    });
  },
});
export const { _ } = commentSlice.actions;
export const commentsReducer = commentSlice.reducer;
