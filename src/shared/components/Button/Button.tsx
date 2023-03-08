import React from "react";

interface IProps {
  className: string;
  label: string;
  disabled: boolean;
  onClick: () => void;
}

const Button: React.FC<IProps> = ({...props}) => {
  return (
    <button
      type="button"
      className={props.className}
      disabled={props.disabled}
      onClick={props.onClick}
    >
      {props.label}
    </button>
  )
};

export {Button};
