import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

const url = process.env.NEXT_PUBLIC_BASE_URL;

export const toggleSubscription = createAsyncThunk('toggleSubscription', async (channelId) => {
  try {
    const res = await axios.post(`${url}/subscription/c/${channelId}`)
    return res.data.data
  } catch (err) {
    throw err
  }
})

export const getMySubscribers = createAsyncThunk('getMySubscribers', async (channelId) => {
  try {
    const res = await axios.get(`${url}/subscription/c/${channelId}`)
    return res.data.data
  } catch (err) {
    throw err
  }
})

export const getMySubscription = createAsyncThunk('getMySubscription', async (userId) => {
  try {
    const res = await axios.get(`${url}/subscription/u/${userId}`)
    return res.data.data
  } catch (err) {
    throw err
  }
})

const subscriptionSlice = createSlice({
  name:'subscription',
  initialState:{
    loading: false,
    subscribed:false,
    mySubscribers: [],
    mySubscriptions: [],
  },
  reducers:{},
  extraReducers:(builder)=>{
    builder
      .addCase(toggleSubscription.pending, (state) => {
        state.loading = true
      })
      .addCase(toggleSubscription.fulfilled, (state, action) => {
        state.loading = false,
        state.subscribed = !state.subscribed
      })
      .addCase(getMySubscribers.pending, (state) => {
        state.loading = true
      })
      .addCase(getMySubscribers.fulfilled, (state, action) => {
        state.loading = false,
        state.mySubscribers = action.payload
      })
      .addCase(getMySubscription.pending, (state) => {
        state.loading = true
      })
      .addCase(getMySubscription.fulfilled, (state, action) => {
        state.loading = false,
        state.mySubscriptions = action.payload
      })
  }
})

export default subscriptionSlice.reducer;