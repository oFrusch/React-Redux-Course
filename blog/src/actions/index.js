import _ from "lodash";
import jsonPlaceholder from "../apis/jsonPlaceholder";

export const fetchPostsAndUsers = () => async (dispatch, getState) => {
  await dispatch(fetchPosts());

  // _.map iterates over getState().posts array and grabs all the userIds
  // _.unique filters the array that _.map returns so that an array of unique ids is returned
  const userIds = _.uniq(_.map(getState().posts, "userId"));

  // update state with each user in the system only once (prevents repeats of fetching the same user a bunch of times)
  userIds.forEach(id => dispatch(fetchUser(id)));
};

export const fetchPosts = () => async dispatch => {
  const response = await jsonPlaceholder.get("/posts");

  dispatch({
    type: "FETCH_POSTS",
    payload: response.data
  });
};

// Below function is simplified syntax of this
// const fetchUser = function(id){
//   return async function(dispatch){
//     const response = await jsonPlaceholder.get(`/users/${id}`);

//     dispatch({
//       type: "FETCH_USER",
//       payload: response.data
//     });
//   }
// }

export const fetchUser = id => async dispatch => {
  const response = await jsonPlaceholder.get(`/users/${id}`);

  dispatch({
    type: "FETCH_USER",
    payload: response.data
  });
};

// MEMOIZED VERSION
// export const fetchUser = id => dispatch => {
//   _fetchUser(id, dispatch);
// };

// const _fetchUser = _.memoize(async (id, dispatch) => {
//   const response = await jsonPlaceholder.get(`/users/${id}`);

//   dispatch({
//     type: "FETCH_USER",
//     payload: response.data
//   });
// });
