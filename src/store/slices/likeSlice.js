import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";

const url = process.env.NEXT_PUBLIC_BASE_URL;

export const toggleVideoLike = createAsyncThunk("toggleVideoLike", async () => {
  
})

export const toggleCommentLike = createAsyncThunk("toggleCommentLike", async () => {
  
})

export const getLikedVideos = createAsyncThunk("getLikedVideos", async () => {
  
})

const likeSlice = createSlice({
  name:'like',
  initialState:{
    loading: false,
    likedVideos: []
  },
  reducers:{},
  extraReducers:(builder)=>{
    builder
      .addCase(getLikedVideos.pending, (state) => {

      })
      .addCase(getLikedVideos.fulfilled, (state, action) => {

      })
  }
})

export default likeSlice.reducer;