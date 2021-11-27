export default function Mute({ muted, setMuted, volume }) {
  if (muted || volume === 0) {
    return (
      <i
        className="fas fa-volume-mute fa-2x player__button"
        onClick={() => setMuted((m) => !m)}
      ></i>
    );
  } else {
    return (
      <i
        onClick={() => setMuted((m) => !m)}
        className="fas fa-volume-up fa-2x player__button"
      ></i>
    );
  }

  //   if (0 < volume && volume < 0.33) {
  //     return (
  //       <i
  //         onClick={() => setMuted((m) => !m)}
  //         className="fas fa-volume-off fa-2x player__button"
  //       ></i>
  //     );
  //   } else if (0.33 <= volume && volume <= 0.66) {
  //     return (
  //       <i
  //         onClick={() => setMuted((m) => !m)}
  //         className="fas fa-volume-down fa-2x player__button"
  //       ></i>
  //     );
  //   } else if (0.66 < volume && volume <= 1) {
  //     return (
  //       <i
  //         onClick={() => setMuted((m) => !m)}
  //         className="fas fa-volume-up fa-2x player__button"
  //       ></i>
  //     );
  //   }
}
