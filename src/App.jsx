import { useEffect, useState } from "react";
import { v4 as uuid } from "uuid";
import { CookiesProvider, useCookies } from "react-cookie";
import NewProject from "./components/NewProject";
import NoProjectSelected from "./components/NoProjectSelected";
import ProjectsSidebar from "./components/ProjectsSidebar";
import SelectedProject from "./components/SelectedProject";

function App() {
  const [projectsCookie, setProjectsCookie] = useCookies(["projects"]);
  const [projectsState, setProjectsState] = useState({
    selectedProjectId: undefined,
    projects: [],
    tasks: [],
  });
  if (
    projectsCookie.projects &&
    projectsState.projects.length <= 0 &&
    projectsCookie.projects.length > 0
  ) {
    setProjectsState((pre) => ({
      ...pre,
      projects: [...pre.projects, ...projectsCookie.projects],
    }));
  }
  if (
    projectsCookie.tasks &&
    projectsState.tasks.length <= 0 &&
    projectsCookie.tasks.length > 0
  ) {
    setProjectsState((pre) => ({
      ...pre,
      tasks: [...pre.tasks, ...projectsCookie.tasks],
    }));
  }
  const handleStartAddProject = () => {
    setProjectsState((prev) => ({
      ...prev,
      selectedProjectId: null,
    }));
  };
  const handleCancelAddProject = () => {
    setProjectsState((prev) => ({
      ...prev,
      selectedProjectId: undefined,
    }));
  };
  const handleAddProject = (projectData) => {
    setProjectsState((prev) => {
      const newProjectId = uuid();
      const newProject = {
        id: newProjectId,
        ...projectData,
      };
      setProjectsCookie("projects", [...prev.projects, newProject], {
        path: "/",
      });
      return {
        ...prev,
        selectedProjectId: undefined,
        projects: [...prev.projects, newProject],
      };
    });
  };
  const handleDeleteProject = (projectId) => {
    setProjectsState((prev) => {
      const newArray = prev.projects.filter(
        (project) => project.id !== projectId
      );
      setProjectsCookie("projects", [...newArray], {
        path: "/",
      });
      return {
        ...prev,
        selectedProjectId: undefined,
        projects: [...newArray],
      };
    });
  };
  const handleSelectProject = (projectId) => {
    setProjectsState((prev) => ({
      ...prev,
      selectedProjectId: projectId,
    }));
  };

  const handleAddTask = (projectId, task) => {
    setProjectsState((prev) => {
      setProjectsCookie(
        "tasks",
        [...prev.tasks, { id: uuid(), projectId, content: task }],
        {
          path: "/",
        }
      );
      return {
        ...prev,
        tasks: [...prev.tasks, { id: uuid(), projectId, content: task }],
      };
    });
  };
  const handleDeleteTask = (taskId) => {
    setProjectsState((prev) => {
      const newArray = prev.tasks.filter((task) => task.id !== taskId);
      setProjectsCookie("tasks", [...newArray], {
        path: "/",
      });
      return {
        ...prev,
        tasks: [...newArray],
      };
    });
  };

  let content;
  if (projectsState.selectedProjectId === null) {
    content = (
      <NewProject
        handleAddProject={handleAddProject}
        handleCancelAddProject={handleCancelAddProject}
      />
    );
  } else if (projectsState.selectedProjectId === undefined) {
    content = <NoProjectSelected onStartAddProject={handleStartAddProject} />;
  } else {
    const selectedProject = projectsState.projects.find(
      (project) => project.id === projectsState.selectedProjectId
    );
    content = selectedProject ? (
      <SelectedProject
        project={selectedProject}
        onDelete={handleDeleteProject}
        onAddTask={handleAddTask}
        onDeleteTask={handleDeleteTask}
        tasks={projectsState.tasks.filter(
          (task) => task.projectId === projectsState.selectedProjectId
        )}
      />
    ) : (
      <NoProjectSelected onStartAddProject={handleStartAddProject} />
    );
  }

  return (
    <CookiesProvider>
      <main className='h-screen my-8 flex gap-8'>
        <ProjectsSidebar
          onStartAddProject={handleStartAddProject}
          onSelectProject={handleSelectProject}
          projects={projectsState.projects}
          selectedProjectId={projectsState.selectedProjectId}
        />
        {content}
      </main>
    </CookiesProvider>
  );
}

export default App;
