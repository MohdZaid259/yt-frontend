import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import {url} from '../../constant.js'

const subscriptionSlice = createSlice({
  name:'subscription',
  initialState:{

  },
  reducers:{},
  extraReducers:(builder)=>{
    builder
      .addCase()
  }
})