import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import {url} from '../../constant.js'
import axios from "axios";

export const getCurrentUser = createAsyncThunk('getCurrentUser', async (data) => {
  try {
    const res = await axios.get(`${url}/user/current-user`,data)
    console.log(res.data)
    return res.data
  } catch (err) {
    throw err
  }
})

export const updateAccount = createAsyncThunk('updateAccount', async (data) => {
  try {
    const res = await axios.patch(`${url}/user/update-account`,data)
    console.log(res.data)
    return res.data
  } catch (err) {
    throw err
  }
})

export const updateAvatar = createAsyncThunk('updateAvatar', async (data) => {
  try {
    const res = await axios.patch(`${url}/user/update-avatar`,data)
    console.log(res.data)
    return res.data
  } catch (err) {
    throw err
  }
})

export const updateCoverImage = createAsyncThunk('updateCoverImage', async (data) => {
  try {
    const res = await axios.patch(`${url}/user/update-cover-image`,data)
    console.log(res.data)
    return res.data
  } catch (err) {
    throw err
  }
})

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
    history:[],
    error:null
  },
  reducers:{},
  extraReducers:(builder)=>{
    builder
      .addCase(getCurrentUser.fulfilled,(state,action)=>{
        state.user = action.payload
        state.loading = false
      })
  }
})

export default userSlice.reducer