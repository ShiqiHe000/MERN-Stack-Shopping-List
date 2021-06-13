import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import initialItems from "../config/initialItems";
import axios from "axios";
import { tokenConfig } from "./AuthSlice";
import { getErrors } from "./ErrorSlice";

// get all items
export const fetchItems = createAsyncThunk(
    "itmeSlice/fetchItems",
    async (_, { dispatch, getState, rejectWithValue }) => {
        try {
            const config = tokenConfig(getState);

            const response = await axios.get("/api/items", config);
            return response.data;
        } catch (err) {
            dispatch(
                getErrors({
                    msg: err.response.data,
                    status: err.response.status,
                })
            );
            return rejectWithValue(err.response);
        }
    }
);

// add one item
export const addItem = createAsyncThunk(
    "itmeSlice/addItem",
    async (name, { dispatch, getState, rejectWithValue }) => {
        try {
            const config = tokenConfig(getState);
            const response = await axios.post("/api/items", { name }, config);
            return response.data;
        } catch (err) {
            dispatch(
                getErrors({
                    msg: err.response.data,
                    status: err.response.status,
                })
            );
            return rejectWithValue(err.response);
        }
    }
);

// delete one item
export const deleteItem = createAsyncThunk(
    "itmeSlice/deleteItem",
    async (id, { dispatch, getState, rejectWithValue }) => {
        try {
            const config = tokenConfig(getState);
            await axios.delete(`/api/items/${id}`, config);
            return { id };
        } catch (err) {
            dispatch(
                getErrors({
                    msg: err.response.data,
                    status: err.response.status,
                })
            );
            return rejectWithValue(err.response);
        }
    }
);

export const itemSlice = createSlice({
    name: "itemSlice",
    initialState: initialItems,
    reducers: {},
    extraReducers: (builder) => {
        builder
            .addCase(fetchItems.pending, (state, action) => {
                state.loading = true;
            })
            .addCase(fetchItems.fulfilled, (state, action) => {
                state.items = action.payload;
                state.loading = false;
            })
            .addCase(fetchItems.rejected, (state, action) => {
                state.loading = false;
            })
            .addCase(addItem.pending, (state, action) => {
                state.loading = true;
            })
            .addCase(addItem.fulfilled, (state, action) => {
                state.items.push(action.payload);
                state.loading = false;
            })
            .addCase(addItem.rejected, (state, action) => {
                state.loading = false;
            })
            .addCase(deleteItem.pending, (state, action) => {
                state.loading = true;
            })
            .addCase(deleteItem.fulfilled, (state, action) => {
                const newItemList = state.items.filter(
                    (item) => item._id !== action.payload.id
                );
                state.items = newItemList;
                state.loading = false;
            });
    },
});

export default itemSlice.reducer;
