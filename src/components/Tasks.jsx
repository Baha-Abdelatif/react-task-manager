import React from "react";
import NewTask from "./NewTask";

export default function Tasks({ onAddTask, onDeleteTask, projectId, tasks }) {
  const handleDelete = (taskId) => {
    onDeleteTask(taskId);
  };
  return (
    <section>
      <h2 className='text-2xl font-bold text-stone-700 mb-4'>Tasks</h2>
      <NewTask onAddTask={onAddTask} projectId={projectId} />
      {tasks && tasks.length > 0 ? (
        <ul className='p-4 mt-8 rounded-md bg-stone-100'>
          {tasks.map((task) => {
            return (
              <li className='flex justify-between my-4' key={task.id}>
                <span>{task.content}</span>
                <button
                  className='text-stone-700 hover:text-red-500'
                  onClick={() => handleDelete(task.id)}
                >
                  X Delete
                </button>{" "}
              </li>
            );
          })}
        </ul>
      ) : (
        <p className='text-stone-800 my-4'>
          This project does not have any tasks yet.
        </p>
      )}
    </section>
  );
}
