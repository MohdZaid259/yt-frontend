import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";

const url = process.env.NEXT_PUBLIC_BASE_URL;

export const createComment = createAsyncThunk("createComment", async () => {
  
})
export const editComment = createAsyncThunk("editComment", async () => {

})
export const deleteComment = createAsyncThunk("deleteComment", async () => {

})
export const getAllComments = createAsyncThunk("getAllComments", async () => {

})

const commentSlice = createSlice({
  name:'comment',
  initialState:{
    loading: false,
    comments: [],
  },
  reducers:{},
  extraReducers:(builder)=>{
    builder
      .addCase(createComment.pending, (state) => {
        
      })
      .addCase(editComment.pending, (state) => {
        
      })
      .addCase(deleteComment.fulfilled, (state, action) => {
        
      })
      .addCase(getAllComments.pending, (state) => {
        
      })
      .addCase(getAllComments.fulfilled, (state, action) => {
        
      })
  }
})

export default commentSlice.reducer