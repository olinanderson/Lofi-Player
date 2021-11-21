import { Fragment, useState } from "react";

import PropTypes from "prop-types";
import { connect } from "react-redux";

import AudioPlayer from "./audio/AudioPlayer";
import AudioList from "./audio/AudioList";
import Spinner from "./Spinner";

const Browse = ({ filesLoaded }) => {
  const [isPlaying, setIsPlaying] = useState(false);
  const [trackIndex, setTrackIndex] = useState(0);

  const playingParams = {
    isPlaying: isPlaying,
    setIsPlaying: setIsPlaying,
    trackIndex: trackIndex,
    setTrackIndex: setTrackIndex,
  };

  if (filesLoaded) {
    return (
      <Fragment>
        <AudioList playingParams={playingParams} />
        <AudioPlayer playingParams={playingParams} />
      </Fragment>
    );
  } else {
    return <Spinner />;
  }
};

Browse.propTypes = {
  filesLoaded: PropTypes.bool,
};

const mapStateToProps = (state) => ({
  filesLoaded: state.audio.filesLoaded,
});

export default connect(mapStateToProps)(Browse);
