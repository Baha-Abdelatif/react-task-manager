import React, { forwardRef } from "react";
import PropTypes from "prop-types";

const Input = forwardRef(function Input(
  { isTextarea = false, label, ...props },
  ref
) {
  const classes =
    "w-full p-1 border-b-2 rounded-sm border-stone-300 bg-stone-200 text-stone-600 focus:outline-none focus:border-stone-600";
  return (
    <p className='flex flex-col gap-1 my-4'>
      <label
        className='text-sm font-bold uppercase text-stone-500'
        htmlFor={label.toLowerCase()}
      >
        {label}
      </label>
      {isTextarea ? (
        <textarea
          className={classes}
          {...props}
          name={label.toLowerCase()}
          id={label.toLowerCase()}
          cols='30'
          rows='10'
          ref={ref}
        ></textarea>
      ) : (
        <input
          className={classes}
          {...props}
          name={label.toLowerCase()}
          id={label.toLowerCase()}
          ref={ref}
        />
      )}
    </p>
  );
});
export default Input;

Input.propTypes = {
  isTextarea: PropTypes.bool,
  label: PropTypes.string,
};
