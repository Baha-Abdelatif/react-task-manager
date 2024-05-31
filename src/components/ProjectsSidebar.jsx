import React from "react";
import PropTypes from "prop-types";
import { v4 as uuid } from "uuid";
import Button from "./Button";

export default function ProjectsSidebar({
  onStartAddProject,
  onSelectProject,
  projects,
  selectedProjectId,
}) {
  return (
    <aside className='w-1/3 px-8 py-16 bg-stone-900 text-stone-50 md:w-72 rounded-r-xl'>
      <h2 className='mb-8 font-bold uppercase md:text-xl text-stone-200'>
        Your Projects
      </h2>
      <div>
        <Button onClick={onStartAddProject}>+ Add Project</Button>
      </div>
      <ul className='mt-8'>
        {projects.length > 0 &&
          projects.map((project) => {
            return (
              <li key={project.id}>
                <button
                  className={`w-full text-left px-2 py-1 rounded-sm my-1 hover:text-stone-200 hover:bg-stone-800 ${
                    project.id === selectedProjectId
                      ? "text-stone-200 bg-stone-800"
                      : "text-stone-400"
                  }`}
                  onClick={() => onSelectProject(project.id)}
                >
                  {project.title}
                </button>
              </li>
            );
          })}
      </ul>
    </aside>
  );
}
ProjectsSidebar.propTypes = {
  onStartAddProject: PropTypes.func,
  onSelectProject: PropTypes.func,
  projects: PropTypes.array,
};
