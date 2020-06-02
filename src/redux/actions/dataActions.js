import { SET_ITEMS, LOADING_DATA } from "../types"
import { db } from "../../util/firebase"

export const getItems = () => (dispatch) => {
  dispatch({ type: LOADING_DATA })
  db.collection("/items")
    .get()
    .then((data) => {
      let items = []
      console.log(data.docs)
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

export const getItem = () => (dispatch) => {}
