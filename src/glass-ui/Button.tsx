import { css, cx } from "@emotion/css";
import { MouseEventHandler, ReactNode } from "react";

type ButtonVariant = "primary" | "secondary";

type ButtonSize = "lg" | "m" | "s";

type ButtonProps = {
  onClick: MouseEventHandler<HTMLButtonElement>;
  variant?: ButtonVariant;
  size?: ButtonSize;
  className?: string;
  children: ReactNode;
};

const Button = ({ onClick, size = "s", variant = "primary", className, children }: ButtonProps) => {
  return (
    <button className={cx(getButtonStyles(size, variant), className)} onClick={onClick}>
      {children}
    </button>
  );
};

export default Button;

const getButtonStyles = (size: ButtonSize, variant: ButtonVariant) => {
  let fontSize, padding, borderBackgorundColor, fillBackGroundColor, hoverBackgroundColor;

  switch (variant) {
    case "primary":
      borderBackgorundColor = `#1caa00`;
      fillBackGroundColor = `#1dac00`;
      hoverBackgroundColor = `#63e649`;
      break;
    case "secondary":
      borderBackgorundColor = `#a15600`;
      fillBackGroundColor = `#b16a01`;
      hoverBackgroundColor = `#ffa600`;
      break;
  }

  switch (size) {
    case "s":
      fontSize = "0.8rem";
      padding = "0px 10px";
      break;
  }

  return css`
    cursor: pointer;
    color: white;
    background-color: #282c34;
    position: relative;
    font-family: "Titillium Web";
    z-index: 0;
    font-size: ${fontSize};
    border: 0;
    padding: ${padding};
    background-image: linear-gradient(135deg, transparent 8%, ${borderBackgorundColor} 8% 92%, transparent 92%);
    :before {
      content: "";
      position: absolute;
      z-index: -1;
      left: 0px;
      right: 0px;
      top: 2px;
      bottom: 2px;
      background-image: linear-gradient(135deg, transparent 8%, ${fillBackGroundColor} 8% 92%, transparent 92%);
    }
    :hover {
      :before {
        background-image: linear-gradient(135deg, transparent 8%, ${hoverBackgroundColor} 8% 92%, transparent 92%);
      }
    }
  `;
};
