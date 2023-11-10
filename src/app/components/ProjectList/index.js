import React from "react";
import Link from "next/link";

import projectData from "/public/data/projectData.json";
const ProjectList = async () => {
  return (
    <div className="grid grid-cols-3 content-center gap-y-5 gap-x-10 text-primary3">
      {projectData.map((project) => {
        return (
          <div className="flex flex-col gap-5  " key={project.id}>
            <hr className="h-[2px] my-2 bg-primary3 border-0 " />
            <div className="flex flex-col gap-2">
              <h1 className="text-4xl font-bold">{project.projectName}</h1>
              <h2 className="text-lg">{project.buildWith}</h2>
            </div>
            <Link
              href={{
                pathname: `/project/${project.id}`,
                query: {
                  id: project.id,
                  description: project.description,
                  projectName: project.projectName,
                  buildWith: project.buildWith,
                  year: project.year,
                  githubLink: project.githubLink,
                  demoLink: project.demoLink,
                  images: project.images
                }
              }}
              style={{ backgroundImage: `url(${project.images[0]})` }}
              id={project.id}
              className="flex rounded-md  w-[400px] h-[260px] items-center justify-center cursor-pointer  bg-cover bg-center relative overflow-hidden"
            >
              <div className="flex items-center justify-center group absolute inset-0 transition-all  ease-in-out duration-300 hover:bg-primary3 hover:bg-opacity-95">
                <span className="text-primary1 opacity-0 group-hover:opacity-100 ease-in-out duration-1000">
                  View More
                </span>
              </div>
            </Link>
          </div>
        );
      })}
    </div>
  );
};

export default ProjectList;
