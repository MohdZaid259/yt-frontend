import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";

const url = process.env.NEXT_PUBLIC_BASE_URL;

export const getAllVideos = createAsyncThunk('getAllVideos', async () => {

})

export const publishVideo = createAsyncThunk('publishVideo', async () => {

})

export const updateVideo = createAsyncThunk('updateVideo', async () => {

})

export const deleteVideo = createAsyncThunk('deleteVideo', async () => {

})

export const getVideoById = createAsyncThunk('getVideoById', async () => {

})

export const togglePublish = createAsyncThunk('togglePublish', async () => {

})



const videoSlice = createSlice({
  name:'video',
  initialState:{
    loading:false,
    video:null,
    videos:[],
    publishToggle:false
  },
  reducers:{},
  extraReducers:(builder)=>{
    builder
      .addCase(getAllVideos.pending,(state)=>{

      })
      .addCase(getAllVideos.fulfilled, (state, action) => {
        
      })
      .addCase(publishVideo.pending, (state) => {

      })
      .addCase(publishVideo.fulfilled, (state, action) => {
        
      })
      .addCase(updateVideo.pending, (state) => {

      })
      .addCase(updateVideo.fulfilled, (state, action) => {

      })
      .addCase(deleteVideo.pending, (state) => {

      })
      .addCase(deleteVideo.fulfilled, (state, action) => {

      })
      .addCase(getVideoById.pending, (state) => {

      })
      .addCase(getVideoById.fulfilled, (state, action) => {
        
      })
      .addCase(togglePublish.fulfilled, (state) => {

      });
  }
})

export default videoSlice.reducer