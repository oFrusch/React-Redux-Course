import _ from "lodash";
import {
  CREATE_STREAM,
  FETCH_STREAMS,
  FETCH_STREAM,
  DELETE_STREAM,
  EDIT_STREAM
} from "../actions/types";

export default (state = {}, action) => {
  switch (action.type) {
    case FETCH_STREAMS:
      // mapKeys creates a new object where each key is the 'id' and each value is the
      // stream associated with the id
      return { ...state, ..._.mapKeys(action.payload, "id") };
    case FETCH_STREAM:
      return { ...state, [action.payload.id]: action.payload };
    case CREATE_STREAM:
      return { ...state, [action.payload.id]: action.payload };
    case EDIT_STREAM:
      return { ...state, [action.payload.id]: action.payload };
    case DELETE_STREAM:
      // deletes the object with the id specified in action.payload
      // (this is what is passed as the payload in the delete streams action creator)
      // then returns a new object w/out that stream
      return _.omit(state, action.payload);
    default:
      return state;
  }
};
