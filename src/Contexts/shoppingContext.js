import { createContext, useContext } from "react";

export const shoppingContext = createContext({
    lists: [{
        id: 1,
        list: "item 1",
        completed: false
    }],

    addList: (list) => {},
    updatedList: (list, id) => {},
    deleteList: (id) => {},
    toogleComplete: (id) => {}
})

export const useShopping = () => {
    return useContext(shoppingContext)
}

export const ShoppingProvider = shoppingContext.Provider