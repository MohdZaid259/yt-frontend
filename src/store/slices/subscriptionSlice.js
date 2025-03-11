import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";

const url = process.env.NEXT_PUBLIC_BASE_URL;

export const toggleSubscription = createAsyncThunk('toggleSubscription', async () => {
  
})
export const getMySubscribers = createAsyncThunk('getMySubscribers', async () => {
  
})
export const getMySubscription = createAsyncThunk('getMySubscription', async () => {
  
})

const subscriptionSlice = createSlice({
  name:'subscription',
  initialState:{
    loading: false,
    mySubscribers: [],
    mySubscriptions: [],
  },
  reducers:{},
  extraReducers:(builder)=>{
    builder
      .addCase(toggleSubscription.pending, (state) => {
        state.loading = true;
      })
      .addCase(toggleSubscription.fulfilled, (state, action) => {

      })
      .addCase(getMySubscribers.pending, (state) => {

      })
      .addCase(getMySubscribers.fulfilled, (state, action) => {

      })
      .addCase(getMySubscription.pending, (state) => {

      })
      .addCase(getMySubscription.fulfilled, (state, action) => {

      })
  }
})

export default subscriptionSlice.reducer;