import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

const url = process.env.NEXT_PUBLIC_BASE_URL;

export const toggleVideoLike = createAsyncThunk("toggleVideoLike", async (videoId) => {
  try {
    const res = await axios.post(`${url}/like/v/${videoId}`)
    return res.data.data
  } catch (err) {
    throw err
  }
})

export const toggleCommentLike = createAsyncThunk("toggleCommentLike", async (commentId) => {
  try {
    const res = await axios.post(`${url}/like/c/${commentId}`)
    return res.data.data
  } catch (err) {
    throw err
  }
})

export const toggleReplyLike = createAsyncThunk("toggleReplyLike", async (replyId) => {
  try {
    const res = await axios.post(`${url}/like/r/${replyId}`)
    return res.data.data
  } catch (err) {
    throw err
  }
})

export const getLikedVideos = createAsyncThunk("getLikedVideos", async () => {
  try {
    const res = await axios.post(`${url}/like/likedVideos`)
    return res.data.data
  } catch (err) {
    throw err
  }
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
        state.loading = true
      })
      .addCase(getLikedVideos.fulfilled, (state, action) => {
        state.loading = false
        state.likedVideos = action.payload
      })
  }
})

export default likeSlice.reducer;