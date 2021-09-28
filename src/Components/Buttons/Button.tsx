import "./Button.css";

const Button = ({ ...props }) => {
  return <button onClick={props.function}>{props.text}</button>;
};

export default Button;
