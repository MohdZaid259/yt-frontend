import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
const url = process.env.NEXT_PUBLIC_BASE_URL;

export const registerUser = createAsyncThunk('register', async (userData) => {
  try {

    const res = await axios.post(`${url}/user/register`,userData)
    console.log(res.data)
    return res.data
  } catch (err) {
    console.log(err)
    throw err
  }
})
export const loginUser = createAsyncThunk('login', async (data) => {
  try {
    const res = await axios.post(`${url}/user/login`,data)
    console.log(res.data)
    return res.data
  } catch (err) {
    throw err
  }
})
export const refreshToken = createAsyncThunk('refreshToken', async (data)=>{
  try {
    const res = await axios.post(`${url}/user/refresh-token`,data)
    console.log(res.data)
    return res.data
  } catch (err) {
    throw err
  }
})
export const logoutUser = createAsyncThunk('logout', async () => {
  try {
    await axios.post(`${url}/user/logout`)
  } catch (err) {
    throw err
  }
})
export const changePassword = createAsyncThunk('changePassword', async (data) => {
  try {
    const res = await axios.post(`${url}/user/change-password`,data)
    console.log(res.data)
    return res.data
  } catch (err) {
    throw err
  }
})

const authSlice=createSlice({
  name:'auth',
  initialState:{
    user:null,
    isAuthenticated:false,
    accessToken:null,
    refreshToken:null,
    loading:false,
    error:null
  },
  reducers:{
    clearAuthState: (state,action) => {
      state.user = null
      state.accessToken = null
      state.refreshToken = null
      state.isAuthenticated = false
      state.loading = false
      state.error = null
    }
  },
  extraReducers:(builder)=>{
    builder
      .addCase(loginUser.pending,(state,action)=>{
        state.loading = true
      })
      .addCase(loginUser.fulfilled,(state,action)=>{
        state.user = action.payload.user
        state.accessToken = action.payload.accessToken
        state.refreshToken = action.payload.refreshToken
        state.isAuthenticated = true
        state.loading = false
      })
      .addCase(loginUser.rejected,(state,action)=>{
        state.error = action.payload
        state.loading = false
      })
      .addCase(registerUser.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(registerUser.fulfilled, (state) => {
        state.loading = false;
      })
      .addCase(registerUser.rejected, (state, action) => {
        state.error = action.payload;
        state.loading = false;
      })
      .addCase(refreshToken.fulfilled, (state, action) => {
        state.accessToken = action.payload.accessToken;
        state.refreshToken = action.payload.refreshToken;
      })
      .addCase(refreshToken.rejected, (state) => {
        state.isAuthenticated = false;
      })
      .addCase(logoutUser.fulfilled, (state) => {
        state.user = null;
        state.accessToken = null;
        state.refreshToken = null;
        state.isAuthenticated = false;
      })
      .addCase(logoutUser.rejected, (state, action) => {
        state.error = action.payload;
      })
      .addCase(changePassword.fulfilled,(state,action)=>{
        state.loading = false
      })
      .addCase(changePassword.rejected,(state,action)=>{
        state.loading = false
        state.error = action.payload
      })
  }
})

export const { clearAuthState } = authSlice.actions;
export default authSlice.reducer;