import { configureStore } from "@reduxjs/toolkit";
import itemsReducer from "./ItemSlice";
import errorReducer from "./ErrorSlice";
import authReducer from "./AuthSlice";

export default configureStore({
    reducer: {
        items: itemsReducer,
        error: errorReducer,
        auth: authReducer,
    },
});
