import * as api from '../api/index'
import { FETCH_ALL, CREATE, UPDATE, DELETE, LIKE } from '../constants/actionTypes'
export const getPosts = () => async (dispatch) => {
  try {
    const { data } = await api.fetchPosts()

    const action = {
      type: FETCH_ALL,
      payload: data
    }

    dispatch(action)
  } catch (error) {
    console.log(error)
  }
}
export const createPost = (post) => async (dispatch) => {
  try {
    const { data } = await api.createPost(post)

    const action = {
      type: CREATE,
      payload: data
    }

    dispatch(action)
  } catch (error) {
    console.log(error)
  }
}
export const updatePost = (id, post) => async (dispatch) => {
  try {
    const { data } = await api.updatePost(id, post)
    const action = {
      type: UPDATE,
      payload: data
    }

    dispatch(action)
  } catch (error) {
    console.log(error)
  }
}
export const deletePost = (id) => async (dispatch) => {
  try {
    await api.deletePost(id)
    const action = {
      type: DELETE,
      payload: id
    }

    dispatch(action)
  } catch (error) {
    console.log(error)
  }
}

// route(server)->controller(server)->api(client)->action(client)->reducer(client)->view(client)
export const likePost = (id) => async (dispatch) => {
  try {
    const { data } = await api.likePost(id)
    const action = {
      type: LIKE,
      payload: data
    }

    dispatch(action)
  } catch (error) {
    console.log(error)
  }
}
