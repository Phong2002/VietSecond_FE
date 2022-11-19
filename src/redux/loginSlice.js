import { createSlice } from '@reduxjs/toolkit'


const isLogin = (localStorage.getItem("TOKEN")?true:false)
export const loginSlice = createSlice({
    name: 'login',
    initialState: {
      value: isLogin,
    },
    reducers: {
      login: (state) => {
        state.value = true
      },
      logout: (state) => {
        state.value = false
      },
    },
  })
  
  export const { login, logout } = loginSlice.actions
  export const selectStateLogin =(state)=>state.login.value

  
  export default loginSlice.reducer
  