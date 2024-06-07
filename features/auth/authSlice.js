import { createSlice } from "@reduxjs/toolkit";

const authSlice = createSlice({
    name : 'auth',
    initialState:{
        user:null,
        token:null
    },
    reducers :{
        setCredentials :(state, action)=>{
            const {user , accessToken} = action.payload
            state.user = user;
            state.token =accessToken
        },
        logOut: (state, action)=>{
            state.user = null
            state.token= null
        },
        initializeAuth: (state, action)=>{
            console.log("hereme")
            const accessToken = JSON.parse(localStorage.getItem("user"))?.accessToken;
            const user = JSON.parse(
              localStorage.getItem("user")
            )?.user;
            if (accessToken ) {
             
              state.token = accessToken
                state.user = user
              
            }

        }
    }
})

export const {setCredentials, logOut , initializeAuth}=  authSlice.actions ;
export default authSlice.reducer;
export const  getUser = (state) => state.auth.user
export const  getToken = (state) => state.auth.token