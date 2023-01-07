import React from "react";
import { Link } from "react-router-dom";
import btnStyles from "./button.module.scss";

const Button = (props) => {
  const { label, value, to, className = "", onClick, style } = props;
  return (
    <div>
      <Link
        className={`btn ${btnStyles.marginBtn} ${className}`}
        to={to}
        value={value}
        onClick={onClick}
        style={style}
      >
        {label}
      </Link>
    </div>
  );
};

export default Button;
