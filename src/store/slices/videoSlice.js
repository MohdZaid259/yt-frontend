import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import {url} from '../../constant.js'

const videoSlice = createSlice({
  name:'video',
  initialState:{

  },
  reducers:{},
  extraReducers:(builder)=>{
    builder
      .addCase()
  }
})