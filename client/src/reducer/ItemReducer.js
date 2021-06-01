
import {ITEM_ACTIONS} from '../config/itemActions';


export const ItemReducer = (itemsInfo, action) => {

    switch (action.type) {
        case ITEM_ACTIONS.ADD: {
            const newItem = action.payload.newItem;
            return {
                ...itemsInfo, 
                items: [...itemsInfo.items, newItem]
            };
        }
        case ITEM_ACTIONS.DELETE: {
            const afterDelete = itemsInfo.items.filter((item) => item._id !== action.payload.id);
         
            return {
                ...itemsInfo,
                items: afterDelete
            };
        }
        case ITEM_ACTIONS.LOADING: {
            return {
                ...itemsInfo, 
                loading: true
            }
        }
        case ITEM_ACTIONS.GET_ALL: {
            return {
                ...itemsInfo,
                items: action.payload.data, 
                loading: false
            }
        }
        default: 
            return itemsInfo;
    }
}