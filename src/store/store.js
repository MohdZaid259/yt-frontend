import { configureStore } from "@reduxjs/toolkit";
import authSlice from './slices/authSlice.js'
import userSlice from './slices/userSlice.js'
import videoSlice from './slices/videoSlice.js'
import commentSlice from './slices/commentSlice.js'
import likeSlice from './slices/likeSlice.js'
import playlistSlice from './slices/playlistSlice.js' 
import subscriptionSlice from './slices/subscriptionSlice.js'
import dashboardSlice from './slices/dashboardSlice.js'

const store = configureStore({
  reducer:{
    auth:authSlice,
    user:userSlice,
    video:videoSlice,
    comment:commentSlice,
    like:likeSlice,
    playlist:playlistSlice,
    subscription:subscriptionSlice,
    dashboard:dashboardSlice
  }
})

export default store