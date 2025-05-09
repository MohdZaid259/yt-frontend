import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

const url = process.env.NEXT_PUBLIC_BASE_URL;

export const registerUser = createAsyncThunk('register', async (data) => {
  const formData = new FormData()
  formData.append('avatar',data.avatar)
  formData.append('username',data.username)
  formData.append('fullname',data.fullname)
  formData.append('email',data.email)
  formData.append('password',data.password)
  if(data.coverImage){
    formData.append('coverImage',data.coverImage)
  }

  try {
    const res = await axios.post(`${url}/user/register`,formData)
    return res.data.data
  } catch (err) {
    throw err
  }
})
export const loginUser = createAsyncThunk('login', async (data) => {
  try {
    const res = await axios.post(`${url}/user/login`,data,{withCredentials:true})
    const accessToken = res.data.data.accessToken
    const refreshToken = res.data.data.refreshToken
    return { 'user':res.data.data.user, accessToken, refreshToken }
  } catch (err) {
    throw err
  }
})
export const refreshToken = createAsyncThunk('refreshToken', async ()=>{
  try {
    const res = await axios.post(`${url}/user/refresh-token`)
    return res.data
  } catch (err) {
    throw err
  }
})
export const logoutUser = createAsyncThunk('logout', async () => {
  try {
    await axios.post(`${url}/user/logout`,{},{withCredentials:true})
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
export const getCurrentUser = createAsyncThunk("getCurrentUser", async () => {
  try {
    const accessToken = window.sessionStorage.getItem('access');
    if(!accessToken) throw new Error('Access token not found!')
      
    const res = await axios.get(`${url}/user/current-user`,
      {
        headers: {
          'Authorization': `Bearer ${accessToken}`,
          'Content-Type': 'application/json',
        },
        withCredentials: true 
      }
    );    
    return res.data.data
  } catch (err) {
    throw err
  }
})
export const updateAvatar = createAsyncThunk("updateAvatar", async (data) => {
  try {
    const res = await axios.post(`${url}/user/update-avatar`,data)
    return res.data
  } catch (err) {
    throw err
  }
})
export const updateCoverImg = createAsyncThunk("updateCoverImg", async (data) => {
  try {
    const res = await axios.post(`${url}/user/update-cover-image`,data)
    return res.data
  } catch (err) {
    throw err
  }
})
export const updateUserDetails = createAsyncThunk("updateUserDetails", async (data) => {
  try {
    const res = await axios.post(`${url}/user/update-account`,data)
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
    loading:false,
    error:null
  },
  reducers:{
    clearAuthState: (state) => {
      state.user = null
      state.isAuthenticated = false
      state.loading = false
      state.error = null
    }
  },
  extraReducers:(builder)=>{
    builder
      .addCase(loginUser.pending,(state)=>{
        state.loading = true
      })
      .addCase(loginUser.fulfilled,(state,action)=>{
        state.user = action.payload.user
        state.isAuthenticated = true
        state.loading = false
      })
      .addCase(loginUser.rejected,(state,action)=>{
        state.error = action.payload
        state.loading = false
      })
      .addCase(registerUser.pending, (state) => {
        state.loading = true;
      })
      .addCase(registerUser.fulfilled, (state,action) => {
        state.loading = false
        state.user = action.payload
      })
      .addCase(registerUser.rejected, (state, action) => {
        state.error = action.payload;
        state.loading = false;
      })
      .addCase(logoutUser.fulfilled, (state) => {
        state.user = null;
        state.isAuthenticated = false;
      })
      .addCase(logoutUser.rejected, (state, action) => {
        state.error = action.payload;
      })
      .addCase(changePassword.fulfilled,(state,action)=>{
        state.loading = false
        state.user = action.payload.user
      })
      .addCase(changePassword.pending,(state)=>{
        state.loading = true
      })
      .addCase(changePassword.rejected,(state,action)=>{
        state.loading = false
        state.error = action.payload
      })
      .addCase(getCurrentUser.fulfilled,(state,action)=>{
        state.loading = false
        state.user = action.payload
        state.isAuthenticated = true
      })
      .addCase(getCurrentUser.pending,(state)=>{
        state.loading = true
      })
      .addCase(getCurrentUser.rejected,(state,action)=>{
        state.loading = false
        state.error = action.payload
        state.isAuthenticated = false
      })
      .addCase(updateAvatar.fulfilled,(state)=>{
        state.loading = false
        state.user = action.payload.user
      })
      .addCase(updateAvatar.pending,(state)=>{
        state.loading = true
      })
      .addCase(updateAvatar.rejected,(state,action)=>{
        state.loading = false
        state.error = action.payload
      })
      .addCase(updateCoverImg.fulfilled,(state)=>{
        state.loading = false
        state.user = action.payload.user
      })
      .addCase(updateCoverImg.pending,(state)=>{
        state.loading = true
      })
      .addCase(updateCoverImg.rejected,(state,action)=>{
        state.loading = false
        state.error = action.payload
      })
      .addCase(updateUserDetails.fulfilled,(state)=>{
        state.loading = false
        state.user = action.payload.user
      })
      .addCase(updateUserDetails.pending,(state)=>{
        state.loading = true
      })
      .addCase(updateUserDetails.rejected,(state,action)=>{
        state.loading = false
        state.error = action.payload
      })
  }
})

export const { clearAuthState } = authSlice.actions;
export default authSlice.reducer;