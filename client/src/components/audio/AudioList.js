import { Fragment, useEffect } from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import Spinner from "../Spinner";

const AudioList = ({
  files,
  filesLoaded,
  shuffle,
  shuffledFiles,
  playingParams,
}) => {
  const { isPlaying, setIsPlaying, trackIndex, setTrackIndex } = playingParams;

  useEffect(() => {
    document.getElementsByClassName("song-details").onclick = (e) => {
      console.log(e);
    };
  }, []);

  if (!filesLoaded) {
    return <Spinner />;
  } else {
    const replaceAll = (string, search, replace) => {
      return string.split(search).join(replace);
    };

    var newFiles = files.sort((a, b) => parseFloat(a.img) - parseFloat(b.img)); // Making sure files are in ascending order

    const list = newFiles.map((file) => {
      let fileName = replaceAll(file.fileName, "_", " ");
      let fileArtist;

      if (fileName.includes("–")) {
        fileArtist = fileName.substr(
          fileName.indexOf("–") + 1,
          fileName.length
        );
        fileArtist = fileArtist.substr(0, fileArtist.length - 14);
        fileName = fileName.substr(0, fileName.indexOf("–"));
      } else {
        fileArtist = fileName.substr(
          fileName.indexOf("-") + 1,
          fileName.length
        );
        fileArtist = fileArtist.substr(0, fileArtist.length - 14);
        fileName = fileName.substr(0, fileName.indexOf("-"));
      }

      const handleClick = (img) => {
        if (shuffle) {
          for (let i = 0; i < shuffledFiles.length - 1; i++) {
            if (img === shuffledFiles[i].img) {
              setTrackIndex(i);
            }
          }
        } else {
          setTrackIndex(img - 1);
        }

        if (trackIndex === img - 1) {
          if (isPlaying) {
            setIsPlaying(false);
          } else {
            setIsPlaying(true);
          }
        }
      };

      const checkOverlays = (currentIndex, img) => {
        let newIndex = currentIndex;
        if (shuffle) {
          newIndex = shuffledFiles[currentIndex].img - 1;
        }

        if (newIndex === img - 1) {
          if (isPlaying) {
            return (
              <Fragment>
                <img
                  className="currently-playing"
                  src="/volume.gif"
                  alt="Volume Playing Gif"
                ></img>
                <i className="fas fa-pause fa-2x player__button list-player"></i>
              </Fragment>
            );
          } else {
            return (
              <Fragment>
                <i className="fas fa-play fa-2x player__button list-player"></i>
              </Fragment>
            );
          }
        } else {
          return (
            <i className="fas fa-play fa-2x player__button list-player"></i>
          );
        }
      };

      return (
        <div
          key={file.img}
          className="song-details"
          onClick={() => handleClick(file.img)}
        >
          <div className="list-img">
            <img src={"/imgs/" + file.img + ".jpg"} alt={fileName} />
            {checkOverlays(trackIndex, file.img)}
          </div>

          <div className="name-artist">
            <p className="song-name">{fileArtist}</p>
            <p className="song-artist">{fileName}</p>
          </div>
          {/* {checkPlayingIcon()} */}
        </div>
      );
    });

    return (
      <Fragment>
        <div className="list-container">
          {list}
          <div className="bottom-space"></div>
        </div>
        <div id="bottom-fade"></div>
      </Fragment>
    );
  }
};

AudioList.propTypes = {
  files: PropTypes.array.isRequired,
  filesLoaded: PropTypes.bool,
  shuffle: PropTypes.bool.isRequired,
  shuffledFiles: PropTypes.array.isRequired,
};

const mapStateToProps = (state) => ({
  files: state.audio.files,
  filesLoaded: state.audio.filesLoaded,
  shuffle: state.audio.shuffle,
  shuffledFiles: state.audio.shuffledFiles,
});

export default connect(mapStateToProps)(AudioList);
