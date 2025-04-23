import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

const url = process.env.NEXT_PUBLIC_BASE_URL;

export const createPlaylist = createAsyncThunk('createPlaylist', async ({name,description}) => {
  try {
    const res = await axios.post(`${url}/playlist`,{ name,description })
    return res.data.data
  } catch (err) {
    throw err
  }
})

export const addVideoToPlaylist = createAsyncThunk('addVideoToPlaylist', async (videoId) => {
  try {
    const res = await axios.patch(`${url}/playlist/add/${videoId}`)
    return res.data.data
  } catch (err) {
    throw err
  }
})

export const removeVideoFromPlaylist = createAsyncThunk('removeVideoFromPlaylist', async (videoId) => {
  try {
    const res = await axios.patch(`${url}/playlist/remove/${videoId}`)
    return res.data.data
  } catch (err) {
    throw err
  }
})

export const upadtePlaylist = createAsyncThunk('upadtePlaylist', async ({playlistId,name,description}) => {
  try {
    const res = await axios.patch(`${url}/playlist/${playlistId}`,{ name,description })
    return res.data.data
  } catch (err) {
    throw err
  }
})

export const deletePlaylist = createAsyncThunk('deletePlaylist', async (playlistId) => {
  try {
    const res = await axios.delete(`${url}/playlist/${playlistId}`)
    return res.data.data
  } catch (err) {
    throw err
  }
})

export const getPlaylistByUser = createAsyncThunk('getPlaylistByUser', async (userId) => {
  try {
    const res = await axios.get(`${url}/playlist/user/${userId}`)
    return res.data.data
  } catch (err) {
    throw err
  }
})

const playlistSlice = createSlice({
  name:'playlist',
  initialState:{
    loading: false,
    playlist: []
  },
  reducers:{},
  extraReducers:(builder)=>{
    builder
      .addCase(createPlaylist.pending,(state)=>{
        state.loading = true
      })
      .addCase(createPlaylist.fulfilled,(state,action)=>{
        state.loading = false,
        state.playlist = action.payload
      })
      .addCase(addVideoToPlaylist.pending,(state)=>{
        state.loading = true
      })
      .addCase(addVideoToPlaylist.fulfilled,(state,action)=>{
        state.loading = false,
        state.playlist = action.payload
      })
      .addCase(removeVideoFromPlaylist.pending,(state)=>{
        state.loading = true
      })
      .addCase(removeVideoFromPlaylist.fulfilled,(state,action)=>{
        state.loading = false,
        state.playlist = action.payload
      })
      .addCase(upadtePlaylist.pending,(state)=>{
        state.loading = true
      })
      .addCase(upadtePlaylist.fulfilled,(state,action)=>{
        state.loading = false,
        state.playlist = action.payload
      })
      .addCase(getPlaylistByUser.pending,(state)=>{
        state.loading = true
      })
      .addCase(getPlaylistByUser.fulfilled,(state,action)=>{
        state.loading = false,
        state.playlist = action.payload
      })
  }
})

export default playlistSlice.reducer;