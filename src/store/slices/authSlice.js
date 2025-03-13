import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import toast from "react-hot-toast";
import useLocalStorage from "@/hooks/useLocalStorage";

const url = process.env.NEXT_PUBLIC_BASE_URL;

const [setAccessToken,getAccessToken,removeAccessToken] = useLocalStorage('access')
const accessToken = getAccessToken()

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
    toast.success('Registered successfully!!')
    return res.data
  } catch (err) {
    toast.error(err?.response?.data?.message)
    throw err
  }
})
export const loginUser = createAsyncThunk('login', async (data) => {
  try {
    const res = await axios.post(`${url}/user/login`,data,{withCredentials:true})
    const accessToken = res.data.data.accessToken
    const refreshToken = res.data.data.refreshToken
    toast.success('LoggedIn successfully!!')
    return { 'user':res.data.data.user, accessToken, refreshToken }
  } catch (err) {
    toast.error(err?.response?.data?.message);
    throw err
  }
})
export const refreshToken = createAsyncThunk('refreshToken', async ()=>{
  try {
    const res = await axios.post(`${url}/user/refresh-token`)
    console.log(res.data)
    return res.data
  } catch (err) {
    throw err
  }
})
export const logoutUser = createAsyncThunk('logout', async () => {
  try {
    await axios.post(`${url}/user/logout`)
    toast.success('Logged Out!!')
  } catch (err) {
    toast.error(err?.response?.data?.message)
    throw err
  }
})
export const changePassword = createAsyncThunk('changePassword', async (data) => {
  try {
    const res = await axios.post(`${url}/user/change-password`,data)
    toast.success('Password changed!!')
    console.log(res.data)
    return res.data
  } catch (err) {
    toast.error(err?.response?.data?.message);
    throw err
  }
})
export const getCurrentUser = createAsyncThunk("getCurrentUser", async () => {
  try {
    const res = await axios.post(`${url}/user/current-user`,{ },
      {
        headers: {
          'Authorization': `Bearer ${accessToken}`,
          'Content-Type': 'application/json',
        },
        withCredentials: true 
      }
    );    
    return res.data
  } catch (err) {
    console.log(err)
  }
})
export const updateAvatar = createAsyncThunk("updateAvatar", async (data) => {
  try {
    const res = await axios.post(`${url}/user/update-avatar`,data)
    toast.success('Avatar Updated!!')
    console.log(res.data)
    return res.data
  } catch (err) {
    toast.error(err?.response?.data?.message);
    throw err
  }
})
export const updateCoverImg = createAsyncThunk("updateCoverImg", async (data) => {
  try {
    const res = await axios.post(`${url}/user/update-cover-image`,data)
    toast.success('CoverImage Updated!!')
    console.log(res.data)
    return res.data
  } catch (err) {
    toast.error(err?.response?.data?.message);
    throw err
  }
})
export const updateUserDetails = createAsyncThunk("updateUserDetails", async (data) => {
  try {
    const res = await axios.post(`${url}/user/update-account`,data)
    toast.success('User details updated!!')
    console.log(res.data)
    return res.data
  } catch (err) {
    toast.error(err?.response?.data?.message);
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
      .addCase(registerUser.fulfilled, (state) => {
        state.loading = false
        state.user = action.payload?.user
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
        state.user = action.payload?.user
      })
      .addCase(getCurrentUser.pending,(state)=>{
        state.loading = true
      })
      .addCase(getCurrentUser.rejected,(state,action)=>{
        state.loading = false
        state.error = action.payload
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