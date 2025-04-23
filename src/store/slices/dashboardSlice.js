import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

const url = process.env.NEXT_PUBLIC_BASE_URL;

export const getUserData = createAsyncThunk('getUserData',async () => {
  try {
    const accessToken = window.sessionStorage.getItem('access');
    if(!accessToken) throw new Error('Access token not found!')
      
    const res = await axios.get(`${url}/dashboard/stats`,{
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

export const getUserVideos = createAsyncThunk('getUserVideos',async () => {
  try {
    const accessToken = window.sessionStorage.getItem('access');
    if(!accessToken) throw new Error('Access token not found!')
      
    const res = await axios.get(`${url}/dashboard/videos`,{
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



const dashboardSlice = createSlice({
  name:'dashboard',
  initialState:{
    loading:false,
    data:null,
    videos:[]
  },
  reducers:{},
  extraReducers:(builder)=>{
    builder
      .addCase(getUserData.pending, (state) => {
        state.loading = true
      })
      .addCase(getUserData.fulfilled, (state, action) => {
        state.loading = false,
        state.data = action.payload
      })
      .addCase(getUserVideos.pending, (state) => {
        state.loading = true
      })
      .addCase(getUserVideos.fulfilled, (state, action) => {
        state.loading = false,
        state.videos = action.payload
      })
  }
})

export default dashboardSlice.reducer