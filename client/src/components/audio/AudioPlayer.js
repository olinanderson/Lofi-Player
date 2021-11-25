import React, { useState, useEffect, useRef, useCallback } from "react";
import AudioSpectrum from "react-audio-spectrum";

import PropTypes from "prop-types";
import { connect } from "react-redux";

import store from "../../store";

import Bar from "./Bar";
import Shuffle from "./Shuffle";

import { setShuffle } from "../../actions/audio";

import AudioControls from "./AudioControls";

const getWindowDimensions = () => {
  const { innerWidth: width, innerHeight: height } = window;
  return {
    width,
    height,
  };
};

const useWindowDimensions = () => {
  const [windowDimensions, setWindowDimensions] = useState(
    getWindowDimensions()
  );

  useEffect(() => {
    function handleResize() {
      setWindowDimensions(getWindowDimensions());
    }

    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  return windowDimensions;
};

function formatDuration(duration) {
  var date = new Date(0);

  if (duration) {
    date.setSeconds(duration);
  }

  return date.toISOString().substr(14, 5);
}

const AudioPlayer = ({ files, shuffledFiles, shuffle, playingParams }) => {
  // var { curTime, duration, setClickedTime } = useAudioPlayer(audioId);

  var currentPlayList = files;
  if (shuffle) {
    currentPlayList = shuffledFiles;
  }

  const { isPlaying, setIsPlaying, trackIndex, setTrackIndex } = playingParams;

  // States
  const [trackProgress, setTrackProgress] = useState(0);

  const { fileName, img } = currentPlayList[trackIndex];

  const audioSrc = "/uploads/" + fileName;
  const imgSrc = "/imgs/" + img + ".jpg";

  // Refs
  const audioRef = useRef(new Audio(audioSrc));
  const intervalRef = useRef();
  const isReady = useRef(false);

  audioRef.current.id = trackIndex.toString();

  // Destructure for conciseness
  const { duration } = audioRef.current;

  const onScrub = (value) => {
    // Clear any timers already running
    clearInterval(intervalRef.current);
    audioRef.current.currentTime = value;
    setTrackProgress(audioRef.current.currentTime);
    startTimer();
  };

  const toPrevTrack = useCallback(() => {
    if (trackIndex - 1 < 0) {
      setTrackIndex(currentPlayList.length - 1);
    } else {
      setTrackIndex(trackIndex - 1);
    }
  }, [trackIndex, setTrackIndex, currentPlayList]);

  const toNextTrack = useCallback(() => {
    if (trackIndex < currentPlayList.length - 1) {
      setTrackIndex(trackIndex + 1);
    } else {
      setTrackIndex(0);
    }
  }, [trackIndex, setTrackIndex, currentPlayList]);

  const startTimer = useCallback(() => {
    // Clear any timers already running
    clearInterval(intervalRef.current);

    intervalRef.current = setInterval(() => {
      if (audioRef.current.ended) {
        toNextTrack();
      } else {
        setTrackProgress(audioRef.current.currentTime);
      }
    }, [100]);
  }, [audioRef, intervalRef, toNextTrack, setTrackProgress]);

  useEffect(() => {
    if (isPlaying) {
      audioRef.current.play();
      startTimer();
    } else {
      audioRef.current.pause();
    }
  }, [isPlaying, startTimer]);

  useEffect(() => {
    if (isPlaying) {
      audioRef.current.play();
      startTimer();
    } else {
      audioRef.current.pause();
    }
  }, [isPlaying, startTimer]);

  // Handles cleanup and setup when changing files
  useEffect(() => {
    setIsPlaying(false);
    setTrackProgress(audioRef.current.currentTime);

    if (isReady.current) {
      setIsPlaying(true);
      startTimer();
    } else {
      // Set the isReady ref as true for the next pass
      isReady.current = true;
    }

    // Pause and clean up on unmount
    return () => {
      clearInterval(intervalRef.current);
    };
  }, [trackIndex, shuffledFiles, setIsPlaying, startTimer]);

  useEffect(() => {}, []);

  let songName = currentPlayList[trackIndex].fileName.replace(/_/g, " ");
  let songArtist;

  if (songName.includes("–")) {
    songArtist = songName.substr(songName.indexOf("–") + 1, songName.length);
    songArtist = songArtist.substr(0, songArtist.length - 14);
    songName = songName.substr(0, songName.indexOf("–"));
  } else {
    songArtist = songName.substr(songName.indexOf("-") + 1, songName.length);
    songArtist = songArtist.substr(0, songArtist.length - 14);
    songName = songName.substr(0, songName.indexOf("-"));
  }

  // Canvas heights and widths
  const { height, width } = useWindowDimensions();
  const canvasHeight = 20; // 10vh
  const canvasWidth = 100; // 40vw
  const capHeight = 0.3; // vh
  const capWidth = 0.2; // vw

  return (
    <div className="player">
      <div className="audio-player">
        <audio ref={audioRef} src={audioSrc} id={trackIndex}></audio>
        <AudioSpectrum
          id="audio-canvas"
          height={(canvasHeight * height) / 100}
          width={(canvasWidth * width) / 100}
          audioId={trackIndex.toString()}
          capColor={"black"}
          capHeight={4}
          // capHeight={(capHeight * height) / 100}
          meterWidth={4}
          // meterWidth={(capWidth * width) / 100}
          meterCount={Math.round((canvasWidth * width) / 800) + 50}
          meterColor={[
            { stop: 0, color: "rgb(214, 54, 54)" },
            { stop: 0.5, color: "black" },
            { stop: 1, color: "rgb(214, 54, 54)" },
          ]}
          gap={4}
        />

        <Bar
          curTime={trackProgress}
          duration={duration}
          onTimeUpdate={onScrub}
        />

        <div className="controls">
          <div className="song-details">
            <img src={imgSrc} alt={songArtist} />
            <div className="main-name-artist">
              <p className="song-name">{songArtist}</p>
              <p className="song-artist">{songName}</p>
            </div>
          </div>
          <div className="song-controls">
            <AudioControls
              isPlaying={isPlaying}
              onPrevClick={toPrevTrack}
              onNextClick={toNextTrack}
              onPlayPauseClick={setIsPlaying}
            />
          </div>
          <div className="bar__time">
            <Shuffle
              handleClick={() => {
                store.dispatch(setShuffle(!shuffle, currentPlayList));
              }}
              shuffle={shuffle}
            />
            <span>{formatDuration(audioRef.current.currentTime)}</span> /{" "}
            <span>{formatDuration(duration)}</span>
          </div>
        </div>
      </div>
    </div>
  );
};

AudioPlayer.propTypes = {
  files: PropTypes.array.isRequired,
  shuffle: PropTypes.bool.isRequired,
  shuffledFiles: PropTypes.array.isRequired,
};

const mapStateToProps = (state) => ({
  files: state.audio.files,
  shuffle: state.audio.shuffle,
  shuffledFiles: state.audio.shuffledFiles,
});

export default connect(mapStateToProps)(AudioPlayer);
