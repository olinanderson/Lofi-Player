import React from "react";

const AudioControls = ({
  isPlaying,
  onPlayPauseClick,
  onPrevClick,
  onNextClick,
}) => (
  <div className="audio-controls">
    <i
      className="fas fa-backward fa-2x player__button"
      onClick={onPrevClick}
    ></i>
    {isPlaying ? (
      <i
        className="fas fa-pause fa-2x player__button"
        onClick={() => onPlayPauseClick(false)}
      ></i>
    ) : (
      <i
        className="fas fa-play fa-2x player__button"
        onClick={() => onPlayPauseClick(true)}
      ></i>
    )}
    <i
      className="fas fa-forward fa-2x player__button"
      onClick={onNextClick}
    ></i>
  </div>
);

export default AudioControls;
