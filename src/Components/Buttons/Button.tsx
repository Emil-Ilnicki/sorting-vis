import "./Button.css";

const Button = ({ ...props }) => {
  return (
    <button onClick={() => props.function(props.sliderValue)}>
      {props.text}
    </button>
  );
};

export default Button;
