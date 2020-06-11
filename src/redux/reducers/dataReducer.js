import {
  SET_ITEMS,
  SET_ITEM,
  SET_CART,
  LOADING_DATA,
  CLEAR_CART,
} from "../types"

const initialState = {
  items: [],
  item: {},
  cart: {
    items: [],
    totalCost: 0,
    totalQuantity: 0,
  },
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
      let isAlreadyInCart = state.cart.items.find(
        (item) => item.itemId === action.payload.itemId
      )
        ? true
        : false

      if (isAlreadyInCart) {
        // finding existing item and increasing its quantity
        let existingItem = state.cart.items.find(
          (item) => item.itemId === action.payload.itemId
        )
        existingItem.quantity += action.payload.quantity

        let otherItems = state.cart.items.filter(
          (item) => item.itemId !== action.payload.itemId
        )
        newCart = [...otherItems, existingItem]
      } else {
        newCart = [...state.cart.items, action.payload]
      }

      let totalCost = 0
      let totalQuantity = 0
      newCart.forEach((item) => {
        console.log(item)
        totalQuantity += item.quantity
        totalCost += item.quantity * item.price
      })
      console.log(`cost: ${totalCost}, quantity: ${totalQuantity}`)

      return {
        ...state,
        cart: { items: newCart, totalQuantity, totalCost },
        loading: false,
      }
    case CLEAR_CART:
      return {
        ...state,
        cart: {},
      }

    default:
      return state
  }
}
