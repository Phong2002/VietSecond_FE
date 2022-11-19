import { configureStore } from '@reduxjs/toolkit';
import loginSlice from './loginSlice.js'
export default configureStore({
    reducer: {
        login:loginSlice,
    },
  });