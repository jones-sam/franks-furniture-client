import {
  SET_ITEMS,
  SET_ITEM,
  LOADING_DATA,
  SET_CART,
  INIT_CART,
} from "../types"
import { db } from "../../util/firebase"

export const getItems = () => (dispatch) => {
  dispatch({ type: LOADING_DATA })
  db.collection("/items")
    .get()
    .then((data) => {
      let items = []
      data.docs.forEach((doc) => {
        items.push({
          itemId: doc.id,
          ...doc.data(),
        })
        dispatch({ type: SET_ITEMS, payload: items })
      })
    })
    .catch((err) => console.error(err))
}

export const getItem = (itemId) => (dispatch) => {
  dispatch({ type: LOADING_DATA })
  db.doc(`/items/${itemId}`)
    .get()
    .then((doc) => {
      dispatch({ type: SET_ITEM, payload: { itemId: doc.id, ...doc.data() } })
    })
    .catch((err) => {
      console.error(err)
    })
}

export const addToCart = (item, quantity) => (dispatch) => {
  dispatch({ type: SET_CART, payload: { ...item, quantity } })
}