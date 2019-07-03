/**
 * combination of all the reducers
 * to create single application store
 * blessings of 'redux' :-)
 */

import { combineReducers } from 'redux'
import currentUser from './reducer_user'
import usuario from './reducer_usuario'
import postsCulty from './reducer_postsCulty'
import posts from './reducer_savePost'

export default rootReducer = combineReducers({
  currentUser,
  posts,
  usuario,
  postsCulty
})
