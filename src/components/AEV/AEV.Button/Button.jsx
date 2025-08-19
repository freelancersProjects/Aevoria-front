import './Button.scss';

const Button = ({
  text = 'nothing',
  variant = 'solid',
  size = 'medium',
  onClick,
  className,
  isDisabled = false,
}) => {
  return (
    <button
      className={`btn btn-${variant} btn-${size} ${className}`}
      onClick={onClick}
      disabled={isDisabled}
    >
      {text}
    </button>
  );
};

export default Button;
