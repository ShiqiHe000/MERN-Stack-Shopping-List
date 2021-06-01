import React, { createContext, useReducer } from "react";
import { ItemReducer } from "../reducer/ItemReducer";
import { ITEM_ACTIONS } from "../config/itemActions";
import initialItems from "../config/initialItems";
import axios from "axios";

export const ItemContext = createContext(initialItems);

// provider
export const ItemProvider = ({ children }) => {
    const [itemsInfo, dispatch] = useReducer(ItemReducer, initialItems);

    // add item
    function addItem(name) {
        axios.post("/api/items", { name }).then((res) =>
            dispatch({
                type: ITEM_ACTIONS.ADD,
                payload: {
                    newItem: res.data,
                },
            })
        );
    }

    // delete item
    function deleteItem(id) {
    
        axios.delete(`/api/items/${id}`).then((res) =>
            dispatch({
                type: ITEM_ACTIONS.DELETE,
                payload: {
                    id,
                },
            })
        );
    }

    function setItemsLoading() {
        return {
            type: ITEM_ACTIONS.LOADING,
        };
    }

    function getAllItems() {
        dispatch(setItemsLoading);
        axios.get("/api/items").then((res) =>
            dispatch({
                type: ITEM_ACTIONS.GET_ALL,
                payload: {
                    data: res.data,
                },
            })
        );
    }

    return (
        <ItemContext.Provider
            value={{
                items: itemsInfo.items,
                addItem,
                deleteItem,
                getAllItems,
            }}>
            {children}
        </ItemContext.Provider>
    );
};
