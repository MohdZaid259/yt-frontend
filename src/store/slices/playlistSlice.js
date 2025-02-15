import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import {url} from '../../constant.js'

const playlistSlice = createSlice({
  name:'playlist',
  initialState:{

  },
  reducers:{},
  extraReducers:(builder)=>{
    builder
      .addCase()
  }
})