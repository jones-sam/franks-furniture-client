import { SET_ITEMS, SET_ITEM, LOADING_DATA } from "../types"
// import { createReducer } from "@reduxjs/toolkit"

const initialState = {
  items: [],
  item: {},
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
    default:
      return state
  }
}
