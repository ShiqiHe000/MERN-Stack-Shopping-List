import { configureStore } from '@reduxjs/toolkit';
import itemsReducer from './ItemReducer_redux';

export default configureStore({
  reducer: {
    items: itemsReducer
  },
});