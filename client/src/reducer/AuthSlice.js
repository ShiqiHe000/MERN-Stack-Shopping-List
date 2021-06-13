import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import { getErrors } from "./ErrorSlice";

// check token and load user
export const loadUser = createAsyncThunk(
    "auth/loadUser",
    async (_, { dispatch, getState, rejectWithValue }) => {
        const config = tokenConfig(getState); //config the request with token

        try {
            const response = await axios.get("/api/auth/user", config);
            return response.data;
        } catch (err) {
            dispatch(
                getErrors({
                    msg: err.response.data,
                    status: err.response.status,
                })
            );
            return rejectWithValue(err.response.data);
        }
    }
);

export const register = createAsyncThunk(
    "auth/register",
    async (userInfo, { dispatch, rejectWithValue }) => {
        //userInfo = {
        //     name,
        //     email,
        //     password
        // }

        // make request
        try {
            const response = await axios.post("/api/users", userInfo);
            return response.data;
        } catch (err) {
            console.log(err);
            dispatch(getErrors({
                msg: err.response.data,
                status: err.response.status,
                id: 'REGISTER_FAILED'
            }))

            return rejectWithValue(err.response.data);

        }
    }
);

export const login = createAsyncThunk(
    "auth/login", 
    async (userInfo, {dispatch, rejectWithValue}) => {
        // userInfo = {email, password}

        try{
            const response = await axios.post('/api/auth', userInfo);

            return response.data;
        } catch (err) {
            dispatch(getErrors({
                msg: err.response.data, 
                status: err.response.status,
                id: "LOGIN_FAILED"
            }))

            return rejectWithValue(err.response.data)
        }

    }
)

const initialState = {
    token: localStorage.getItem("token"),
    isAuthenticated: null,
    isLoading: false,
    user: null,
};

// set up config/headers and token
export const tokenConfig = (getState) => {
    // get token from localStoreage
    const token = getState().auth.token;

    // Headers
    const config = {
        headers: {
            "Content-Type": "application/json",
        },
    };

    // if token add to headers
    if (token) {
        config.headers["Authorization"] = token;
    }

    return config;
};

const setUpAuth = (state, action) => {
    localStorage.setItem("token", action.payload.token);
    state.token = action.payload.token;
    state.user = action.payload.user;
    state.isAuthenticated = true;
    state.isLoading = false;
};

const noAuth = (state) => {
    localStorage.removeItem("token");
    state.token = null;
    state.user = null;
    state.isAuthenticated = false;
    state.isLoading = false;
};

const authSlice = createSlice({
    name: "auth",
    initialState,
    reducers: {
        
        loginFail: noAuth,
        logout: noAuth,
        registerFail: noAuth,
    },
    extraReducers: {
        [loadUser.pending]: (state, action) => {
            state.isLoading = true;
        },
        [loadUser.fulfilled]: (state, action) => {
            state.isAuthenticated = true;
            state.isLoading = false;
            state.user = action.payload;
        },
        [loadUser.rejected]: (state, action) => {
            noAuth(state);
        },
        [register.pending]: (state, action) => {
            state.isLoading = true;
        },
        [register.fulfilled]: (state, action) => {
            setUpAuth(state, action);
        },
        [register.rejected]: (state, action) => {
            noAuth(state);
        },
        [login.pending]: (state, action) => {
            state.isLoading = true;
        }, 
        [login.fulfilled]: (state, action) => {
            setUpAuth(state, action);
        }, 
        [login.rejected]: (state, action) => {
            noAuth(state);
        }, 
    },
});

export default authSlice.reducer;

export const {logout} = authSlice.actions;

export const isAuthenticatedSelector = (state) => state.auth.isAuthenticated;
export const userSelector = (state) => state.auth.user;
