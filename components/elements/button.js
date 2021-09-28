import classNames from 'classnames'
import PropTypes from 'prop-types'
import { buttonLinkPropTypes } from 'utils/types'
import Loader from './loader'

const Button = ({
  button,
  appearance,
  compact = false,
  handleClick,
  loading = false,
  type,
  children,
  disabled=false,
  className
}) => {
  return (
    <button disabled={disabled} link={button} onClick={handleClick} type={type}>
      <div
        className={classNames(
          // Common classes
          `flex w-full justify-center lg:w-auto text-center uppercase tracking-wide font-semibold text-base md:text-sm border-2 rounded-lg ${className}`,
          // Full-size button
          {
            'px-8 py-4': compact === false,
          },
          // Compact button
          {
            'px-6 py-2': compact === true,
          },
          // Specific to when the button is fully dark
          {
            'bg-blue-600 text-white border-blue-600':
              appearance === 'dark',
          },
          // Specific to when the button is dark outlines
          {
            'text-blue-600 border-blue-600':
              appearance === 'dark-outline',
          },
          {
            'bg-black text-white border-black': appearance === 'black',
          },
          // Specific to when the button is fully white
          {
            'bg-white text-blue-600 border-white': appearance === 'white',
          },
          // Specific to when the button is white outlines
          {
            'text-white border-white': appearance === 'white-outline',
          },
          {
            'opacity-80 cursor-not-allowed': disabled
          }
        )}
      >
        {loading && <Loader />}
        {button?.text || children}
      </div>
    </button>
  )
}

Button.propTypes = {
  button: buttonLinkPropTypes,
  appearance: PropTypes.oneOf([
    'dark',
    'white-outline',
    'white',
    'dark-outline',
    'black'
  ]),
  compact: PropTypes.bool,
}

export default Button
