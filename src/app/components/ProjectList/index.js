import React from "react";
import Link from "next/link";

import projectData from "/public/data/projectData.json";
const ProjectList = async () => {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-2 2xl:grid-cols-3 3xl:grid-cols-4 gap-y-8 gap-x-6 text-primary3">
      {projectData?.map((project) => {
        return (
          <div className="flex flex-col gap-4 w-full" key={project?.id}>
            <hr className="h-[2px] my-2 bg-primary3 border-0" />
            <div className="flex flex-col gap-1">
              <h1
                className="text-2xl sm:text-3xl lg:text-4xl font-bold line-clamp-1"
                title={project?.projectName}
              >
                {project?.projectName}
              </h1>
              <h2
                className="text-sm sm:text-base lg:text-lg line-clamp-1"
                title={project?.buildWith}
              >
                {project?.buildWith}
              </h2>
            </div>
            <Link
              href={{
                pathname: `/project/${project?.id}`,
                query: {
                  id: project?.id,
                  description: project?.description,
                  projectName: project?.projectName,
                  buildWith: project?.buildWith,
                  year: project?.year,
                  githubLink: project?.githubLink,
                  demoLink: project?.demoLink,
                  additionalLink: project?.additionalLink,
                  images: project?.images
                }
              }}
              style={{ backgroundImage: `url(${project?.images[0]})` }}
              id={project?.id}
              className="w-full h-56 sm:h-64 md:h-72 lg:h-80 bg-cover bg-center rounded-md relative flex items-center justify-center cursor-pointer overflow-hidden"
            >
              <div className="flex items-center justify-center group absolute inset-0 transition-all ease-in-out duration-300 hover:bg-primary3 hover:bg-opacity-95">
                <span className="text-primary1 opacity-0 group-hover:opacity-100 transition-opacity duration-1000">
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
