import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import useLocalStorage from "@/hooks/useLocalStorage";

const url = process.env.NEXT_PUBLIC_BASE_URL;

const [setAccessToken,getAccessToken,removeAccessToken] = useLocalStorage('access')
const accessToken = getAccessToken()

export const getAllVideos = createAsyncThunk('getAllVideos', async () => {
  try {
    const res = await axios.get(`${url}/video`)
    return res.data.data
  } catch (err) {
    throw err
  }
})

export const publishVideo = createAsyncThunk('publishVideo', async () => {

})

export const updateVideo = createAsyncThunk('updateVideo', async () => {

})

export const deleteVideo = createAsyncThunk('deleteVideo', async () => {

})

export const getVideoById = createAsyncThunk('getVideoById', async (data) => {
  try {
    const res = await axios.post(`${url}/video/${data}`,{ },{
      headers: {
        'Authorization': `Bearer ${accessToken}`,
        'Content-Type': 'application/json',
      },
      withCredentials: true 
    })
    return res.data.data
  } catch (err) {
    throw err
  }
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