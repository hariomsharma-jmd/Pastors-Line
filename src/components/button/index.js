import React from "react";
import btnStyles from "./button.module.scss";

const Button = (props) => {
  const { label, value, to, className = "", onClick, style } = props;
  return (
    <div>
      <button
        className={`btn ${btnStyles.marginBtn} ${className}`}
        style={style}
        to={to}
        value={value}
        onClick={onClick}
      >
        {label}
      </button>
    </div>
  );
};

export default Button;
