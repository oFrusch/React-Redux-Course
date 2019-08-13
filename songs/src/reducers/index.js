import { combineReducers } from "redux";

const songsReducer = () => {
  return [
    { title: "Californication", duration: "5:25" },
    { title: "How Deep is Your Love", duration: "4:32" },
    { title: "I Want You Back", duration: "3:23" }
  ];
};

const selectedSongReducer = (selectedSong = null, action) => {
  if (action.type === "SONG_SELECTED") {
    return action.payload;
  }

  return selectedSong;
};

export default combineReducers({
  songs: songsReducer,
  selectedSong: selectedSongReducer
});
