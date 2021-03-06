import {
  FETCH_USERS,
  FETCH_USERS_START,
  FETCH_USERS_DONE,
  FETCH_USER,
  FETCH_USER_START,
  FETCH_USER_DONE,
  POST_USER,
  UPDATE_USER,
  FETCH_USER_ERROR,
  LOGOUT
} from './actions';

export const initialState = {
  list: null,
  current: null,
  loadingList: false,
  loadingCurrent: false,
  errorCurrent: null
};

export function reducer(state = initialState, { type, payload }) {
  switch(type) {
    case FETCH_USERS:
      return { ...state, list: payload.users };
    case FETCH_USER:
      return { ...state, current: payload.userByEmail };
    case FETCH_USERS_START:
      return { ...state, loadingList: true };
    case FETCH_USERS_DONE:
      return { ...state, loadingList: false };
    case FETCH_USER_START:
      return { ...state, loadingCurrent: true };
    case FETCH_USER_DONE:
      return { ...state, loadingCurrent: false };
    case FETCH_USER_ERROR:
      return { ...state, errorCurrent: payload };
    case POST_USER:
      return { ...state, current: payload.createUser };
    case UPDATE_USER:
      return { ...state, current: payload.updateUser };
    case LOGOUT:
      return { ...state, current: null };
    default:
      return state;
  }
}
