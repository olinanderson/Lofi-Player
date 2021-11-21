import {
  LOAD_SOUNDS,
  LOAD_SOUNDS_FAIL,
  SHUFFLE,
  SHUFFLE_FAIL,
} from "../actions/types";

const initialState = {
  files: [],
  filesLoaded: null,
  shuffle: false,
  shuffledFiles: [],
};

const Audio = (state = initialState, action) => {
  const { type, payload } = action;

  switch (type) {
    case LOAD_SOUNDS:
      return {
        ...state,
        files: payload,
        filesLoaded: true,
      };
    case LOAD_SOUNDS_FAIL:
      return {
        ...state,
        filesLoaded: false,
      };
    case SHUFFLE:
      return {
        ...state,
        ...payload,
      };
    case SHUFFLE_FAIL:
      return { ...state };
    default:
      return state;
  }
};

export default Audio;
