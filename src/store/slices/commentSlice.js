import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import {url} from '../../constant.js'

const commentSlice = createSlice({
  name:'comment',
  initialState:{

  },
  reducers:{},
  extraReducers:(builder)=>{
    builder
      .addCase()
  }
})