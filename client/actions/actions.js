import Axios from "axios";
import * as types from '../constants/actionTypes';

// success
export const logIn = (userInfo) => ({
  type: types.LOGIN,
  payload: userInfo.data,
})

// failure
export const loginFailed = (err) => ({
  type: types.LOGIN_FAILED,
  payload: err,
})

export const signupFailed = (err) => ({
  type: types.SIGNUP_FAILED,
  payload: err,
})

export const userLogin = (username, password) => dispatch => {
  return Axios.post('/login', {username: username, password: password})
    .then(userInfo => dispatch(logIn(userInfo)))
    .catch(err => dispatch(loginFailed(err)))
}

export const userSignup = (fullName, email, password) => dispatch => {
  return Axios.post('/api/user', {fullName: fullName, email: email, password: password})
    .then(userInfo => {
      console.log('Created User (POST: /api/user): ', userInfo);
      dispatch(logIn(userInfo));
    })
    .catch(err => dispatch(signupFailed(err)))
}
export const inSession = () => dispatch => {
  return Axios.get('/api/user')
    .then(userInfo => dispatch(logIn(userInfo)))
    .catch(err => dispatch(signupFailed(err)))
}

export const enterEmail = (value) => ({
  type: types.ENTER_EMAIL,
  payload: value,
});
export const enterFullName = (value) => ({
  type: types.ENTER_FULLNAME,
  payload: value,
});
export const enterPassword = (value) => ({
  type: types.ENTER_PASSWORD,
  payload: value,
});
export const enterUsername = (value) => ({
  type: types.ENTER_USERNAME,
  payload: value,
});

export const logOut = () => ({
  type: types.LOGOUT,
})

export const userLogout = (userid) => dispatch => {
  return Axios.post('/logout', {id: userid})
  .then(() => dispatch(logOut()))
}

export const enterSnippet = (value) => ({
  type: types.ENTER_SNIPPET,
  payload: value,
})

export const enterComments = (value) => ({
  type: types.ENTER_COMMENTS,
  payload: value,
})

export const enterProject = (value) => ({
  type: types.ENTER_PROJECT,
  payload: value,
})

export const enterTags = (value) => ({
  type: types.ENTER_TAGS,
  payload: value,
})

export const enterSearch = (value) => ({
  type: types.ENTER_SEARCH,
  payload: value,
})

export const getTagsFromDB = () => dispatch => {
  return fetch('http://localhost:3000/gettags', {
      headers: { "Content-Type": "application/json" },
      credentials: 'include',
      method: 'GET'
  })
  .then(res => res.json())
  .then(jsonData => 
    dispatch({
      type: types.GET_TAGS,
      payload: jsonData,
    })
  )
  .catch(err => console.log(err))
}

export const getSnippetsByTag = (tag) => dispatch => {
  return fetch(`http://localhost:3000/getsnippetsbytag/?tag=${tag}`, {
      headers: { "Content-Type": "application/json" },
      credentials: 'include',
      method: 'GET'
  })
  .then(res => res.json())
  .then(jsonData => 
    dispatch({
      type: types.GET_SNIPPET_BY_TAG,
      payload: jsonData,
    })
  )
  .catch(err => console.log(err))
}

export const getSnippetsByUser = (username) => dispatch => {
  return fetch(`http://localhost:3000/getsnippetsbyuser/?username=${username}`, {
      headers: { "Content-Type": "application/json" },
      credentials: 'include',
      method: 'GET'
  })
  .then(res => res.json())
  .then(jsonData => 
    dispatch({
      type: types.GET_SNIPPET_BY_USER,
      payload: jsonData,
    })
  )
  .catch(err => console.log(err))
}

export const createSnippet = () => (dispatch, getState) => {
  console.log('lol')
  return fetch('http://localhost:3000/createsnippet', {
      headers: { 
        "Content-Type": "application/json",
      },
      credentials: 'include',
      method: 'post',
      body: JSON.stringify({
        snippet: getState().snip.snippet,
        comments: getState().snip.comments,
        project: getState().snip.project,
        tags: getState().snip.tags,
      })
    })
  .then( res => {
    if(res.ok) getSnippetsByUser(getState().user.username)
  })
  .catch(err => console.log(err))
}

export const deleteSnippet = (id) => dispatch => {
  return fetch('http://localhost:3000/deletesnippetbyid?id=${id}', {
      headers: { "Content-Type": "application/json" },
      credentials: 'include',
      method: 'GET',
    })
  .then(res => res.json())
  .then(jsonData => 
    dispatch({
      type: types.DELETE_SNIPPET,
      payload: jsonData,
    })
  )
  .catch(err => console.log(err))
}

//___________________________


  // Database Methods

  // submitSearch() {
  //   let tag = this.state.search;
  //   this.grabSnippetsByTag(tag);
  // };

  // grabSnippetsFromDB(e) {
  //   let tag = e.target.id;
  //   this.grabSnippetsByTag(tag);
  // };
