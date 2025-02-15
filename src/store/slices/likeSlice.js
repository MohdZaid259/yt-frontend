import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import {url} from '../../constant.js'

const likeSlice = createSlice({
  name:'like',
  initialState:{

  },
  reducers:{},
  extraReducers:(builder)=>{
    builder
      .addCase()
  }
})