import React, { useState, useRef } from "react";
import ErrorModal from "./ErrorModal";
export default function NewTask({ onAddTask, projectId }) {
  const [enteredTask, setEnteredTask] = useState("");
  const modalRef = useRef();

  const handleChange = (event) => {
    setEnteredTask(event.target.value);
  };
  const handleClick = () => {
    if (enteredTask.trim() === "") {
      modalRef.current.open();
      return;
    }
    onAddTask(projectId, enteredTask);
    setEnteredTask("");
  };
  return (
    <div className='flex items-center gap-4'>
      <input
        className='w-64 px-2 py-1 rounded-sm bg-stone-200'
        type='text'
        name='newTask'
        id='newTask'
        onChange={handleChange}
        value={enteredTask}
        onKeyDown={(e) => {
          if (e.key === "Enter") {
            handleClick();
          }
        }}
      />
      <button
        className='text-stone-700 hover:text-stone-950'
        onClick={handleClick}
      >
        Add a new Task
      </button>
      <ErrorModal ref={modalRef} buttonLabel='Got it!'>
        <h2 className='text-xl font-bold text-stone-700 my-4'>Invalid Input</h2>
        <p className='text-stone-600 mb-4'>
          Oops... Looks like you forgot to fill a field or two.
        </p>
        <p className='text-stone-600 mb-4'>
          Please make sure you provide a valid value for every input field.
        </p>
      </ErrorModal>
    </div>
  );
}
