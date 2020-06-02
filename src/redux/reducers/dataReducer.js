import { SET_ITEMS, SET_ITEM, SET_CART, LOADING_DATA } from "../types"
// import { createReducer } from "@reduxjs/toolkit"

const initialState = {
  items: [],
  item: {},
  cart: [],
  loading: false,
}

export default function (state = initialState, action) {
  switch (action.type) {
    case LOADING_DATA:
      return {
        ...state,
        loading: true,
      }
    case SET_ITEMS:
      return {
        ...state,
        items: action.payload,
        loading: false,
      }
    case SET_ITEM:
      return {
        ...state,
        item: action.payload,
        loading: false,
      }
    case SET_CART:
      let newCart
      let isAlreadyInCart = state.cart.find(
        (item) => item.itemId === action.payload.itemId
      )
        ? true
        : false

      if (isAlreadyInCart) {
        // finding existing item and increasing its quantity
        let existingItem = state.cart.find(
          (item) => item.itemId === action.payload.itemId
        )
        existingItem.quantity += action.payload.quantity

        let otherItems = state.cart.filter(
          (item) => item.itemId !== action.payload.itemId
        )
        console.log(otherItems)
        newCart = [...otherItems, existingItem]
      } else {
        newCart = [...state.cart, action.payload]
      }
      return {
        ...state,
        cart: newCart,
        loading: false,
      }
    default:
      return state
  }
}
