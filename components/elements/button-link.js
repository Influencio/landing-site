import classNames from "classnames";
import PropTypes from "prop-types";
import { buttonLinkPropTypes } from "utils/types";
import Link from "next/link";
import CustomLink from "./custom-link";

const ButtonContent = ({ button, appearance, compact }) => {
  return (
    <div
      className={classNames(
        // Common classes
        "block w-full lg:w-auto text-center uppercase tracking-wide font-semibold text-base md:text-sm border-2 rounded-lg",
        // Full-size button
        {
          "px-8 py-4": compact === false,
        },
        // Compact button
        {
          "px-6 py-2": compact === true,
        },
        // Specific to when the button is fully dark
        {
          "bg-blue-600 text-white border-blue-600": appearance === "dark",
        },
        {
          "bg-black text-white border-black": appearance === "black",
        },
        // Specific to when the button is dark outlines
        {
          "text-blue-600 border-blue-600": appearance === "dark-outline",
        },
        // Specific to when the button is fully white
        {
          "bg-white text-blue-600 border-white": appearance === "white",
        },
        // Specific to when the button is white outlines
        {
          "text-white border-white": appearance === "white-outline",
        }
      )}
    >
      {button.text}
    </div>
  );
};

const ButtonLink = ({ button, appearance, compact = false, link, children }) => {
  return (
    <CustomLink link={button || {url: link}}>
      <ButtonContent button={button || {text: children}} appearance={appearance} compact={compact} />
    </CustomLink>
  );
};

ButtonLink.propTypes = {
  button: buttonLinkPropTypes,
  appearance: PropTypes.oneOf([
    "dark",
    "white-outline",
    "white",
    "dark-outline",
    "black"
  ]),
  compact: PropTypes.bool,
};

export default ButtonLink;
