import { createSlice } from "@reduxjs/toolkit"

const initialState = {
    user: null,
    loading: true
}

const authSlice = createSlice({
    name: 'auth',
    initialState,
    reducers: {
        // login user
        loginUser: (state, action) => {
            state.user = action.payload
        },
        // logout user
        logOutUser: (state, action) => {
            state.user = null, state.loading = false
        },
        // user state
        setUser: (state, action) => {
            state.user = action.payload
        },
        // loading state
        setLoading: (state, action)=>{
            state.loading = action.payload
        }

    }
})

export const {loginUser, logOutUser, setUser, setLoading} = authSlice.actions
export default authSlice.reducer
