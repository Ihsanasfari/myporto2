"use client";
import Link from "next/link";
import { Carousel, IconButton } from "@material-tailwind/react";
import { BiLogoGithub, BiLink } from "react-icons/bi";

const Page = ({ searchParams }) => {
  const projectData = searchParams;
  return (
    <div className="flex flex-col gap-y-12 min-h-screen items-center justify-center lg:py-40 text-primary1 bg-primary3 py-10 px-10 lg:px-0">
      <span className=" text-left lg:w-[670px] lg:text-center text-sm lg:text-xl">
        {projectData.description}
      </span>

      <div className="flex flex-col lg:flex-row items-center gap-x-10 border p-2 lg:w-[900px] rounded-xl black h-fit">
        <Carousel
          color="black"
          prevArrow={({ handlePrev }) => (
            <IconButton
              variant="text"
              color="black"
              size="lg"
              onClick={handlePrev}
              className="!absolute top-2/4 left-4 -translate-y-2/4"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                strokeWidth={6}
                stroke="currentColor"
                className="h-6 w-6"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M10.5 19.5L3 12m0 0l7.5-7.5M3 12h18"
                />
              </svg>
            </IconButton>
          )}
          nextArrow={({ handleNext }) => (
            <IconButton
              variant="text"
              color="black"
              size="lg"
              onClick={handleNext}
              className="!absolute top-2/4 !right-4 -translate-y-2/4"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                strokeWidth={6}
                stroke="currentColor"
                className="h-6 w-6"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M13.5 4.5L21 12m0 0l-7.5 7.5M21 12H3"
                />
              </svg>
            </IconButton>
          )}
          className="rounded-xl h-60 lg:w-[500px] lg:h-[360px] bg-white"
          navigation={({ setActiveIndex, activeIndex, length }) => (
            <div className="absolute bottom-4 left-2/4 z-50 flex -translate-x-2/4 gap-2 ">
              {new Array(length).fill("").map((_, i) => (
                <span
                  key={i}
                  className={`block h-1 cursor-pointer rounded-2xl transition-all content-[''] ${
                    activeIndex === i
                      ? "w-8 bg-black"
                      : "w-4 bg-blue-gray-900/50"
                  }`}
                  onClick={() => setActiveIndex(i)}
                />
              ))}
            </div>
          )}
        >
          {projectData.images.map((image) => {
            return (
              <img
                key={image}
                width={500}
                height={500}
                src={`/${image}`}
                alt="image"
                className="h-full w-full object-contain"
              />
            );
          })}
        </Carousel>
        <div className="flex flex-col gap-4 justify-center">
          <div className="flex gap-2 justify-center p-4">
            <h5 className="font-extrabold text-2xl">Project Info</h5>
          </div>
          <div className="flex gap-2">
            <h5 className="font-bold">Project Name:</h5>
            <span>{projectData.projectName}</span>
          </div>
          <div className="flex gap-2">
            <h5 className="font-bold">Build with:</h5>
            <span>{projectData.buildWith}</span>
          </div>
          <div className="flex gap-2">
            <h5 className="font-bold">Year:</h5>
            <span>{projectData.year}</span>
          </div>

          <div className="flex gap-2">
            <Link
              target="_blank"
              className="flex items-center  justify-center px-3 py-3 bg-primary4 transition-colors duration-300 ease-in-out  hover:bg-opacity-60 rounded-2xl text-sm gap-3 "
              href={projectData.githubLink}
            >
              <span>Github</span>
              <BiLogoGithub className="w-6 h-6" />
            </Link>
            <Link
              target="_blank"
              className="flex items-center justify-center px-3 py-3 bg-primary4 transition-colors duration-300 ease-in-out  hover:bg-opacity-60 rounded-2xl text-sm gap-3 "
              href={projectData.demoLink}
            >
              <span>Live Demo</span>
              <BiLink className="w-6 h-6" />
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Page;
