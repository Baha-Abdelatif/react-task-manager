import React from "react";
import PropTypes from "prop-types";
import Tasks from "./Tasks";
export default function SelectedProject({
  project,
  onDelete,
  onAddTask,
  onDeleteTask,
  tasks,
}) {
  const formattedDate = new Date(project.deadline).toLocaleDateString("fr-FR", {
    year: "numeric",
    month: "short",
    day: "numeric",
  });

  return (
    <div className='w-[35rem] mt-16'>
      <header className='pb-4 mb-4 border-b-2 border-stone-300'>
        <div className='flex items-center justify-between'>
          <h1 className='text-3xl font-bold text-stone-600 mb-2'>
            {project.title}
          </h1>
          <button
            className='text-stone-600 hover:text-red-500'
            onClick={() => onDelete(project.id)}
          >
            delete x
          </button>
        </div>
        <p className='mb-4 text-stone-400'>{formattedDate}</p>
        <p className='text-stone-600 whitespace-pre-wrap'>
          {project.description}
        </p>
      </header>
      <Tasks
        onAddTask={onAddTask}
        onDeleteTask={onDeleteTask}
        projectId={project.id}
        tasks={tasks}
      />
    </div>
  );
}
SelectedProject.propTypes = {
  project: PropTypes.object,
};
