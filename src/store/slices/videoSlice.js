import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import useSessionStorage from "@/hooks/useSessionStorage";

const url = process.env.NEXT_PUBLIC_BASE_URL;
const apiKey = process.env.NEXT_PUBLIC_API_KEY;
const BASE_URL = "https://www.googleapis.com/youtube/v3";

const [setAccessToken,getAccessToken,removeAccessToken] = useSessionStorage('access')
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
    const res = await axios.get(`${url}/video/${data}`,{
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

export const getShorts = createAsyncThunk('getShorts', async () => {
  try {
    const res = await axios.get(`${BASE_URL}/search`,{
      params:{
        part: "snippet",
        q: "shorts",
        type: "video",
        videoDuration: "short",
        maxResults: 3,
        regionCode: "US", 
        key: apiKey,
      }
    })
    const res2 = await axios.get(`${BASE_URL}/videos`, {
      params: {
        part: "snippet",
        chart: "mostPopular",
        maxResults: 3,
        regionCode: "US", 
        key: apiKey,
      },
    })
    return {
      'shorts':res.data.items, 
      'videos':res2.data.items
    }
  } catch (err) {
    console.log(err)
  }
})

export const searchVideo = createAsyncThunk('searchVideo', async (videoId) => {
  try {
    const res = await axios.get(`${BASE_URL}/videos`, {
      params: {
        part: "snippet,statistics",
        id: videoId,
        key: apiKey,
      }
    });
    return res.data.items[0]
  } catch (err) {
    console.log(err)
  }
})

const videoSlice = createSlice({
  name:'video',
  initialState:{
    loading:false,
    video:null,
    videos:[],
    uploaded:false,
    publishToggle:false
  },
  reducers:{
    makeVideosNull: (state) => {
      state.videos = []
    }
  },
  extraReducers:(builder)=>{
    builder
      .addCase(getAllVideos.pending,(state)=>{
        state.loading = true
      })
      .addCase(getAllVideos.fulfilled, (state, action) => {
        state.loading = false,
        state.videos = [...state.videos, ...action.payload]
      })
      .addCase(publishVideo.pending, (state) => {
        state.loading = true
      })
      .addCase(publishVideo.fulfilled, (state, action) => {
        state.loading = false,
        state.uploaded = true
      })
      .addCase(updateVideo.pending, (state) => {
        state.loading = false
      })
      .addCase(updateVideo.fulfilled, (state, action) => {
        state.loading = false,
        state.uploaded = true
      })
      .addCase(deleteVideo.pending, (state) => {
        state.loading = true
      })
      .addCase(deleteVideo.fulfilled, (state, action) => {
        state.loading = false
      })
      .addCase(getVideoById.pending, (state) => {
        state.loading = true
      })
      .addCase(getVideoById.fulfilled, (state, action) => {
        state.loading = false,
        state.video = action.payload
      })
      .addCase(togglePublish.fulfilled, (state) => {
        state.loading = false,
        state.publishToggle = !state.publishToggle
      })
      .addCase(searchVideo.fulfilled, (state,action) => {
        state.loading = false,
        state.video = action.payload
      })
      .addCase(searchVideo.pending, (state) => {
        state.loading = true
      })
  }
})

export default videoSlice.reducer