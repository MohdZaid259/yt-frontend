import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import {url} from '../../constant.js'
import axios from "axios";

const url = process.env.NEXT_PUBLIC_BASE_URL;

export const updateWatchHistory = createAsyncThunk('updateWatchHistory', async (data) => {
  try {
    const res = await axios.patch(`${url}/user/update-watch-history`,data)
    console.log(res.data)
    return res.data
  } catch (err) {
    throw err
  }
})

export const getChannelProfile = createAsyncThunk('getChannelProfile', async (data) => {
  try {
    const res = await axios.get(`${url}/user/channel-profile/${data}`)
    console.log(res.data)
    return res.data
  } catch (err) {
    throw err
  }
})

export const watchHistory = createAsyncThunk('watchHistory', async () => {
  try {
    const res = await axios.get(`${url}/user/watch-history`)
    console.log(res.data)
    return res.data
  } catch (err) {
    throw err
  }
})

const userSlice = createSlice({
  name:'user',
  initialState:{
    user:null,
    loading:false,
    history:[]
  },
  reducers:{},
  extraReducers:(builder)=>{
    builder
      .addCase(updateWatchHistory.pending, (state) => {
        state.loading = true;
      })
      .addCase(updateWatchHistory.fulfilled, (state, action) => {
        state.loading = false;
        state.history = action.payload;
      })
      .addCase(getChannelProfile.pending, (state) => {
        state.loading = true;
      })
      .addCase(getChannelProfile.fulfilled, (state, action) => {
        state.loading = false;
        state.user = action.payload;
      })
      .addCase(watchHistory.pending, (state) => {
          state.loading = true;
      })
      .addCase(watchHistory.fulfilled, (state, action) => {
          state.loading = false;
          state.history = action.payload;
      });
  }
})

export default userSlice.reducer