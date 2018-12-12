import { getUsers, getUser, createUser } from '../../../services/mongo/users';

export const FETCH_USERS = 'FETCH_USERS';
export const FETCH_USERS_START = 'FETCH_USERS_START';
export const FETCH_USERS_DONE = 'FETCH_USERS_DONE';
export const fetchUsers = () => ({
  type: FETCH_USERS,
  loadStart: FETCH_USERS_START,
  loadEnd: FETCH_USERS_DONE,
  payload: getUsers()
});

export const FETCH_USER = 'FETCH_USER';
export const FETCH_USER_START = 'FETCH_USER_START';
export const FETCH_USER_DONE = 'FETCH_USER_DONE';
export const fetchUser = email => ({
  type: FETCH_USER,
  loadStart: FETCH_USER_START,
  loadEnd: FETCH_USER_DONE,
  payload: getUser(email)
});

export const POST_USER = 'POST_USER';
export const postUser = user => ({
  type: POST_USER,
  payload: createUser(user)
});
