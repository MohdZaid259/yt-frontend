import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import toast from "react-hot-toast";

const url = process.env.NEXT_PUBLIC_BASE_URL;

export const createComment = createAsyncThunk("createComment", async ({videoId,content}) => {
  try {
    const res = await axios.post(`${url}/comment/v/${videoId}`,{content})
    toast.success('Comment added!')
    return res.data.data
  } catch (err) {
    throw err
  }
})

export const editComment = createAsyncThunk("editComment", async ({commentId,content}) => {
  try {
    const res = await axios.patch(`${url}/comment/c/${commentId}`,{content})
    toast.success('Comment edited!')
    return res.data.data
  } catch (err) {
    throw err
  }
})

export const deleteComment = createAsyncThunk("deleteComment", async (commentId) => {
  try {
    const res = await axios.delete(`${url}/comment/c/${commentId}`)
    toast.success('Comment deleted!')
    return res.data.data
  } catch (err) {
    throw err
  }
})

export const getAllComments = createAsyncThunk("getAllComments", async () => {
  try {
    const res = await axios.get(`${url}/comment/v/${videoId}`)
    toast.success('Comments fetched!')
    return res.data.data
  } catch (err) {
    throw err
  }
})

const commentSlice = createSlice({
  name:'comment',
  initialState:{
    loading: false,
    comments: [],
  },
  reducers:{
    makeCommentsNull: (state) => {
      state.comments = []
    }
  },
  extraReducers:(builder)=>{
    builder
      .addCase(createComment.pending, (state) => {
        state.loading = true
      })
      .addCase(createComment.fulfilled, (state,action) => {
        state.loading = false
        state.comments = action.payload
      })
      .addCase(editComment.pending, (state) => {
        state.loading = true
      })
      .addCase(editComment.fulfilled, (state,action) => {
        state.loading = false
        state.comments = action.payload
      })
      .addCase(getAllComments.pending, (state) => {
        state.loading = true
      })
      .addCase(getAllComments.fulfilled, (state, action) => {
        state.loading = false
        state.comments = action.payload
      })
  }
})

export default commentSlice.reducer