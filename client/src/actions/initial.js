import { loadSounds } from "./audio";

export const initialRequests = () => (dispatch) => {
  dispatch(loadSounds());
};
