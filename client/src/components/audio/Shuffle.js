export default function Shuffle({ handleClick, shuffle }) {
  if (shuffle) {
    return (
      <i
        className="fas fa-random player__button"
        onClick={() => handleClick()}
      ></i>
    );
  } else {
    return (
      <i
        className="fas fa-random player__button"
        onClick={() => handleClick()}
        style={{
          color: "lightgrey",
        }}
      ></i>
    );
  }
}
