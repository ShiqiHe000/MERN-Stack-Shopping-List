import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import initialItems from "../config/initialItems";
import axios from "axios";

// get all items
export const fetchItems = createAsyncThunk("itmeSlice/fetchItems", async () => {
    try {
        const response = await axios.get("/api/items");
        return response.data;
    } catch (err) {
        console.log(err);
    }
});

// add one item
export const addItem = createAsyncThunk("itmeSlice/addItem", async (name) => {
    try{
        const response = await axios.post("/api/items", { name });
        return response.data;

    } catch(err) {
        console.log(err);
    }
});

// delete one item
export const deleteItem = createAsyncThunk("itmeSlice/deleteItem", async (id) => {
    try{
        await axios.delete(`/api/items/${id}`);
        return {id};

    } catch(err) {
        console.log(err);
    }
});

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
            .addCase(addItem.pending, (state, action) => {
                state.loading = true;
            })
            .addCase(addItem.fulfilled, (state, action) => {
                state.items.push(action.payload);
                state.loading = false;
            })
            .addCase(deleteItem.pending, (state, action) => {
                state.loading = true;
            })
            .addCase(deleteItem.fulfilled, (state, action) => {
                const newItemList = state.items.filter(item => item._id !== action.payload.id);
                state.items = newItemList;
                state.loading = false;
            })
    }
});

export default itemSlice.reducer;
