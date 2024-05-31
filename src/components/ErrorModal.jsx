import React, { forwardRef, useImperativeHandle, useRef } from "react";
import { createPortal } from "react-dom";
import PropTypes from "prop-types";
import Button from "./Button";

const ErrorModal = forwardRef(function ErrorModal(
  { children, buttonLabel },
  ref
) {
  const dialogRef = useRef();
  useImperativeHandle(ref, () => ({
    open() {
      dialogRef.current.showModal();
    },
  }));

  return createPortal(
    <dialog
      ref={dialogRef}
      className='backdrop:bg-stone-900/90 p-4 rounded-md shadow-md'
    >
      {children}
      <form className='mt-4 text-right' method='dialog'>
        <Button>{buttonLabel}</Button>
      </form>
    </dialog>,
    document.querySelector("#modal-root")
  );
});
ErrorModal.propTypes = {
  children: PropTypes.any,
  buttonLabel: PropTypes.string,
};

export default ErrorModal;
