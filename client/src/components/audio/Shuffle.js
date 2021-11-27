export default function Shuffle({ handleClick, shuffle }) {
  if (shuffle) {
    return (
      <i
        className="fas fa-random fa-2x player__button"
        onClick={() => handleClick()}
      ></i>
    );
  } else {
    return (
      <i
        className="fas fa-random fa-2x player__button"
        onClick={() => handleClick()}
        style={{
          color: "lightgrey",
        }}
      ></i>
    );
  }
}
