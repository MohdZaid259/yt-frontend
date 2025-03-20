import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import toast from "react-hot-toast";

const url = process.env.NEXT_PUBLIC_BASE_URL;

export const createPlaylist = createAsyncThunk('createPlaylist', async ({name,description}) => {
  try {
    const res = await axios.post(`${url}/playlist`,{ name,description })
    toast.success('Playlist created!')
    return res.data.data
  } catch (err) {
    throw err
  }
})

export const addVideoToPlaylist = createAsyncThunk('addVideoToPlaylist', async (videoId) => {
  try {
    const res = await axios.patch(`${url}/playlist/add/${videoId}`)
    toast.success('Video added to playlist!')
    return res.data.data
  } catch (err) {
    throw err
  }
})

export const removeVideoFromPlaylist = createAsyncThunk('removeVideoFromPlaylist', async (videoId) => {
  try {
    const res = await axios.patch(`${url}/playlist/remove/${videoId}`)
    toast.success('Video removed from playlist!')
    return res.data.data
  } catch (err) {
    throw err
  }
})

export const upadtePlaylist = createAsyncThunk('upadtePlaylist', async ({playlistId,name,description}) => {
  try {
    const res = await axios.patch(`${url}/playlist/${playlistId}`,{ name,description })
    toast.success('Playlist updated!')
    return res.data.data
  } catch (err) {
    throw err
  }
})

export const deletePlaylist = createAsyncThunk('deletePlaylist', async (playlistId) => {
  try {
    const res = await axios.delete(`${url}/playlist/${playlistId}`)
    toast.success('Playlist deleted!')
    return res.data.data
  } catch (err) {
    throw err
  }
})

export const getPlaylistByUser = createAsyncThunk('getPlaylistByUser', async (userId) => {
  try {
    const res = await axios.get(`${url}/playlist/user/${userId}`)
    toast.success('Playlist fetched!')
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