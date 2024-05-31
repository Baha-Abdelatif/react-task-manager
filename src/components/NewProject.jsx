import React, { useRef } from "react";
import PropTypes from "prop-types";
import Input from "./Input";
import ErrorModal from "./ErrorModal";

export default function NewProject({
  handleAddProject,
  handleCancelAddProject,
}) {
  const titleRef = useRef();
  const descriptionRef = useRef();
  const deadlineRef = useRef();
  const modalRef = useRef();
  const handleSave = () => {
    const enteredTitle = titleRef.current.value;
    const enteredDescription = descriptionRef.current.value;
    const enteredDeadline = deadlineRef.current.value;

    if (
      enteredTitle.trim() === "" ||
      enteredDescription.trim() === "" ||
      enteredDeadline.trim() === ""
    ) {
      modalRef.current.open();
      return;
    }

    handleAddProject({
      title: enteredTitle,
      description: enteredDescription,
      deadline: enteredDeadline,
    });
  };
  return (
    <>
      <ErrorModal ref={modalRef} buttonLabel='Got it!'>
        <h2 className='text-xl font-bold text-stone-700 my-4'>
          Invalid Inputs
        </h2>
        <p className='text-stone-600 mb-4'>
          Oops... Looks like you forgot to fill a field or two.
        </p>
        <p className='text-stone-600 mb-4'>
          Please make sure you provide a valid value for every input field.
        </p>
      </ErrorModal>
      <div className='w-[35rem] mt-16'>
        <menu className='flex items-center justify-end gap-4 my-4'>
          <li>
            <button
              className='text-stone-800 hover:text-stone-950'
              onClick={handleCancelAddProject}
            >
              Cancel
            </button>
          </li>
          <li>
            <button
              className='px-6 py-2 rounded-md bg-stone-800 text-stone-50 hover:bg-stone-950'
              onClick={handleSave}
            >
              Save
            </button>
          </li>
        </menu>
        <div>
          <Input type='text' ref={titleRef} label={"Title"} />
          <Input ref={descriptionRef} isTextarea label={"Description"} />
          <Input type='date' ref={deadlineRef} label={"Deadline"} />
        </div>
      </div>
    </>
  );
}
NewProject.propTypes = {
  handleAddProject: PropTypes.func,
  handleCancelAddProject: PropTypes.func,
};
