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

import dataReducer from "./reducers/dataReducer"

const initialState = {}

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
