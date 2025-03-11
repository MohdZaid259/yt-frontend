import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";

const url = process.env.NEXT_PUBLIC_BASE_URL;

export const createPlaylist = createAsyncThunk('createPlaylist', async () => {
  
})
export const addVideoToPlaylist = createAsyncThunk('addVideoToPlaylist', async () => {

})
export const removeVideoFromPlaylist = createAsyncThunk('removeVideoFromPlaylist', async () => {

})
export const upadtePlaylist = createAsyncThunk('upadtePlaylist', async () => {

})
export const getPlaylistById = createAsyncThunk('getPlaylistById', async () => {

})
export const getPlaylistsByUser = createAsyncThunk('getPlaylistsByUser', async () => {

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
      .addCase(getPlaylistById.pending,(state)=>{
        state.loading = true
      })
      .addCase(getPlaylistById.fulfilled,(state,action)=>{
        state.loading = false,
        state.playlist = action.payload
      })
      .addCase(getPlaylistsByUser.pending,(state)=>{
        state.loading = true
      })
      .addCase(getPlaylistsByUser.fulfilled,(state,action)=>{
        state.loading = false,
        state.playlist = action.payload
      })
  }
})

export default playlistSlice.reducer;