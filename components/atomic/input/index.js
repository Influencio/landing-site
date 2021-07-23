import React, { useState, useEffect } from "react";
import {
  AiOutlineEyeInvisible,
  AiOutlineEye,
  AiFillCloseCircle,
  AiFillCheckCircle,
} from "react-icons/ai";
import { BiSearchAlt } from 'react-icons/bi'
import useDebounce from "hooks/useDebounce";

const Input = React.forwardRef((props, ref) => {
  const { label, type, id, error, suffix, validateIcon, value, debounceDelay, onChange, onSearch, autoComplete, onBlur, placeholder } = props;

  const originalInputType = type || "text";
  const [inputType, setInputType] = useState(type || "text");

  // Search handlers
  const [searchQuery, setSearchQuery] = useState(null);
  const debouncedSearchTerm = useDebounce(searchQuery, debounceDelay ?? 1000);
  useEffect(() => {
    onSearch && onSearch(debouncedSearchTerm);
  }, [debouncedSearchTerm]);

  const getSuffix = () => {
    const suffixes = [];

    if (validateIcon) {
      if (value || error) {
        suffixes.push(
          error ? (
            <AiFillCloseCircle key="validateIcon" className="text-red-500" />
          ) : (
            <AiFillCheckCircle key="validateIcon" className="text-green-500" />
          )
        );
      }
    }

    if (originalInputType === "password") {
      suffixes.push(
        inputType === "password" ? (
          <AiOutlineEyeInvisible
            key="visible"
            onClick={() => setInputType("text")}
            className="cursor-pointer"
          />
        ) : (
          <AiOutlineEye
            key="visible"
            onClick={() => setInputType("password")}
            className="cursor-pointer"
          />
        )
      );
    }

    if (originalInputType === 'search') {
      suffixes.push(<BiSearchAlt />)
    }

    if (suffix) suffixes.push(suffix);

    return suffixes;
  };

  const handleOnChange = event => {
    if (originalInputType === 'search') {
      setSearchQuery(event.target.value)
    }
    onChange && onChange(event)
  }

  return (
    <div className='w-full'>
      {label ? (
        <label
          htmlFor={id}
          className="block text-gray-700 text-sm font-bold mb-2"
        >
          {label}
        </label>
      ) : null}
      <div className="relative flex items-center">
        <input
          ref={ref}
          value={value}
          autoComplete={autoComplete}
          id={id}
          onBlur={onBlur}
          placeholder={placeholder}
          className={`shadow appearance-none border rounded-lg w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline ${
            error ? "border-red-500" : ""
          }`}
          type={inputType}
          onChange={handleOnChange}
        />
        <div className="flex items-center space-x-2 absolute right-4 text-gray-600 text-xl">
          {getSuffix()}
        </div>
      </div>
      {error ? (
        <p className="text-red-500 text-xs italic">
          {error.message ||
            (error.type === "required" ? `${label} is required` : null)}
        </p>
      ) : null}
    </div>
  );
});

export default Input;
