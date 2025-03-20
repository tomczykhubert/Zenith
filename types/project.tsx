export default interface Project {
  uid: string;
  name: string;
  description: string;
}

export function mapProjectsToSelect(projects: Project[]) {
  return projects.map((project) => {
    return {
      label: project.name,
      value: project.uid,
    };
  });
}
