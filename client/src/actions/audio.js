import axios from "axios";
import { LOAD_SOUNDS, LOAD_SOUNDS_FAIL, SHUFFLE, SHUFFLE_FAIL } from "./types";

// Load user
export const loadSounds = () => async (dispatch) => {
  try {
    const res = await axios.get("/api/audio");

    dispatch({
      type: LOAD_SOUNDS,
      payload: res.data,
    });
  } catch (err) {
    console.log(err);

    dispatch({
      type: LOAD_SOUNDS_FAIL,
    });
  }
};

export const setShuffle = (shuffle, files) => async (dispatch) => {
  try {
    let payload = { shuffle: shuffle };

    if (shuffle) {
      payload = {
        ...payload,
        shuffledFiles: shuffleThe(files),
      };
    } else {
      payload = {
        ...payload,
        shuffledFiles: [],
      };
    }

    dispatch({
      type: SHUFFLE,
      payload: payload,
    });
  } catch (err) {
    console.log(err);

    dispatch({
      type: SHUFFLE_FAIL,
    });
  }
};

const shuffleThe = (array) => {
  return array.slice().sort(() => Math.random() - 0.5);
};
