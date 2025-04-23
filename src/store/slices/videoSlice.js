import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

const url = process.env.NEXT_PUBLIC_BASE_URL;
const apiKey = process.env.NEXT_PUBLIC_API_KEY;
const BASE_URL = "https://www.googleapis.com/youtube/v3";

export const getAllVideos = createAsyncThunk('getAllVideos', async (index,{rejectWithValue}) => {
  try {
    const res = await axios.get(`${url}/video?skip=${index}`)
    const video = res.data.data[0]
    
    if(!video) return rejectWithValue('No more videos!')

    return video
  } catch (err) {
    throw err
  }
})

export const publishVideo = createAsyncThunk('publishVideo', async (data) => {
  const formData = new FormData();
  formData.append("title", data.title);
  formData.append("description", data.description);
  formData.append("videoFile", data.video);
  formData.append("thumbnail", data.thumbnail);

  const accessToken = window.sessionStorage.getItem('access');
  if(!accessToken) throw new Error('Access token not found!')
      
  try {
      const res = await axios.post(`${url}/video/upload-video`, formData, {
        headers: {
          'Authorization': `Bearer ${accessToken}`
        },
        withCredentials: true 
      });
      return res.data.data
  } catch (err) {
      throw err
  }
})

export const updateVideo = createAsyncThunk('updateVideo', async ({ videoId, data }) => {
  const formData = new FormData();
  formData.append("title", data.title);
  formData.append("description", data.description);
  formData.append("thumbnail", data.thumbnail);

  const accessToken = window.sessionStorage.getItem('access');
  if(!accessToken) throw new Error('Access token not found!')
      
  try {
      const res = await axios.patch(`${url}/video/${videoId}`, formData, {
        headers: {
          'Authorization': `Bearer ${accessToken}`
        },
        withCredentials: true 
      });
      return res.data.data
  } catch (err) {
      throw err
  }
})

export const deleteVideo = createAsyncThunk('deleteVideo', async (videoId) => {
  try {
    const accessToken = window.sessionStorage.getItem('access');
    if(!accessToken) throw new Error('Access token not found!')
      
      const res = await axios.delete(`${url}/video/${videoId}`,{
        headers: {
          'Authorization': `Bearer ${accessToken}`,
          'Content-Type': 'application/json',
        },
        withCredentials: true 
      })
      return res.data.data;
  } catch (err) {
      throw err
  }
})

export const getVideoById = createAsyncThunk('getVideoById', async (data) => {
  try {
    const res = await axios.get(`${url}/video/${data}`)
    return res.data.data
  } catch (err) {
    console.log('err',err)
    throw err
  }
})

export const getShorts = createAsyncThunk('getShorts', async (pageToken) => {
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
        pageToken: pageToken || undefined,
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
      'nextPageToken': res.data.nextPageToken,
      'videos':res2.data.items
    }
  } catch (err) {
    console.log(err)
  }
})

export const searchVideoById = createAsyncThunk('searchVideoById', async (videoId) => {
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

export const searchVideoByQuery = createAsyncThunk('searchVideoByQuery', async ({query, maxResults=9}) => {
  try {
    const res = await axios.get(`${BASE_URL}/search`,{
      params: {
        part: 'snippet',
        q: query,
        type: 'video',
        maxResults,
        key: apiKey,
      }
    })
    const videos = res.data.items.map((item) => ({
      videoId: item.id.videoId,
      title: item.snippet.title,
      description: item.snippet.description,
      thumbnail: item.snippet.thumbnails.high.url,
      avatar: item.snippet.thumbnails.high.url,
      channelTitle: item.snippet.channelTitle,
      publishedAt: item.snippet.publishedAt,
    }))

    return videos
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
    publishToggle:false,
    index:0,
    stopFetching: false
  },
  reducers:{
    incrementIndex(state) {
      state.index += 1;
    },
    clearVideos: (state) => {
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
        state.videos.push(action.payload)
      })
      .addCase(getAllVideos.rejected, (state, action) => {
        state.loading = false
        if (action.payload == 'No more videos!') {
          state.stopFetching = true;
        }
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
      .addCase(searchVideoById.fulfilled, (state,action) => {
        state.loading = false,
        state.video = action.payload
      })
      .addCase(searchVideoById.pending, (state) => {
        state.loading = true
      })
      .addCase(searchVideoByQuery.fulfilled, (state,action) => {
        state.loading = false,
        state.videos = [...action.payload]
      })
      .addCase(searchVideoByQuery.pending, (state) => {
        state.loading = true
      })
  }
})

export const { incrementIndex, clearVideos } = videoSlice.actions;
export default videoSlice.reducer