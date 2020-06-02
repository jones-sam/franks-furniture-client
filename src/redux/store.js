// import { configureStore, getDefaultMiddleware } from "@reduxjs/toolkit"
// import dataReducer from "./reducers/dataReducer"

// const reducer = {
//   data: dataReducer,
// }

// const preloadedState = {}

// export default configureStore({
//   reducer,
//   devTools: process.env.NODE_ENV !== "production",
//   preloadedState,
// })

import { createStore, combineReducers, applyMiddleware, compose } from "redux"
import thunk from "redux-thunk"

import localStore from "store"

import dataReducer from "./reducers/dataReducer"

let initialCart = localStore.get("cart")

const initialState = {
  data: {
    items: [],
    item: {},
    loading: false,
    cart: initialCart
      ? initialCart
      : {
          items: [],
          totalCost: 0,
          totalQuantity: 0,
        },
  },
}

const middleware = [thunk]

const reducers = combineReducers({
  data: dataReducer,
})

const store = createStore(
  reducers,
  initialState,
  compose(
    applyMiddleware(...middleware),
    window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__()
  )
)

export default store
