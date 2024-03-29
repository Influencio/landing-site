import React from 'react';

const getSizeStyle = (size) => {
  switch (size) {
    case 'sm':
      return 'h-9 w-auto text-base px-4 py-2';
    case 'lg':
    default:
      return 'h-12 w-auto text-lg px-6 py-3';
  }
};

const getPointerStyle = (disabled) =>
  disabled ? 'cursor-not-allowed' : 'cursor-pointer';

const getTransparencyStyle = (disabled) => (disabled ? 'opacity-50' : '');

const getBorderWidth = (variant, appearance) => {
  if (variant === 'tertiary' || appearance === 'default') {
    return '';
  }

  return 'border-2';
};

const getBorderColors = (variant, appearance, danger, disabled) => {
  if (variant === 'tertiary' || appearance === 'default') {
    return '';
  }

  if (danger) {
    return `border-danger ${
      disabled ? '' : 'hover:border-dangerHover active:border-dangerActive'
    }`;
  }

  if (variant === 'primary') {
    return `border-primary ${
      disabled ? '' : 'hover:border-primaryHover active:border-primaryActive'
    }`;
  } else if (variant === 'secondary') {
    return `border-buttonSecondary ${
      disabled ? '' : 'hover:border-default active:border-secondaryActive'
    }`;
  } else {
    return '';
  }
};

const getBackgroundColors = (variant, appearance, danger, disabled) => {
  if (variant === 'tertiary' || appearance === 'outline') {
    return '';
  }

  if (danger) {
    return `bg-danger ${
      disabled ? '' : 'hover:bg-dangerHover active:bg-dangerActive'
    }`;
  }

  if (variant === 'primary') {
    return `bg-buttonPrimary ${
      disabled ? '' : 'hover:bg-primaryHover active:bg-primaryActive'
    }`;
  } else if (variant === 'secondary') {
    return `bg-buttonSecondary ${
      disabled ? '' : 'hover:bg-inverted active:bg-secondaryActive '
    }`;
  } else {
    return '';
  }
};

const getTextColors = (variant, appearance, danger, disabled) => {
  if (variant === 'tertiary' || appearance === 'outline')
    if (danger) {
      return `text-danger ${
        disabled ? '' : 'hover:text-dangerHover active:text-dangerActive'
      }`;
    }

  if (danger) {
    return 'text-light'
  }

  if (variant === 'tertiary') {
    return `text-primary ${
      disabled ? '' : 'hover:text-tertiaryHover active:text-tertiaryActive'
    }`;
  }

  if (appearance === 'outline') {
    if (variant === 'primary') {
      return `text-primary ${
        disabled ? '' : 'hover:text-tertiaryHover active:text-tertiaryActive'
      }`;
    } else if (variant === 'secondary') {
      return `text-buttonSecondary ${
        disabled ? '' : 'hover:text-default active:text-secondaryActive'
      }`;
    }
  }

  if (variant === 'primary') {
    return 'text-light'
  }

  return 'text-dark dark:text-light';
};

const Button = ({
  type,
  children,
  size,
  onClick,
  disabled,
  variant,
  appearance,
  danger,
  className,
}) => {
  const sizeStyle = getSizeStyle(size);

  return (
    <button
      type={type}
      className={`transition-colors duration-150 rounded-md font-bold font-sans leading-none ${sizeStyle} ${className} ${getPointerStyle(
        disabled,
      )} ${getBorderWidth(variant, appearance)} ${getBorderColors(
        variant,
        appearance,
        danger,
        disabled,
      )} ${getBackgroundColors(
        variant,
        appearance,
        danger,
        disabled,
      )} ${getTextColors(
        variant,
        appearance,
        danger,
        disabled,
      )} ${getTransparencyStyle(disabled)} `}
      onClick={onClick}
      disabled={disabled}
    >
      {children}
    </button>
  );
};

export default Button;