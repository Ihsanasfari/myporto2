"use client";
import Image from "next/image";
import myprofile from "/public/images/profile card.webp";
import { HiOutlineMail } from "react-icons/hi";
import { AiFillLinkedin, AiFillGithub } from "react-icons/ai";
import {
  BiArrowFromTop,
  BiLogoReact,
  BiLogoTailwindCss,
  BiLogoTypescript
} from "react-icons/bi";
import { TbBrandNextjs } from "react-icons/tb";
import { SiBootstrap, SiCodeigniter } from "react-icons/si";
import { RiJavascriptLine } from "react-icons/ri";
import Link from "next/link";
import ProjectList from "./components/ProjectList";
import ExperienceList from "./ExperienceList";
// import Modal from "./components/Modal";
import { useState } from "react";

export default function Home() {
  // const [isOpen, setIsOpen] = useState(false);
  // const handleOpen = (event) => {
  //   setIsOpen(true);
  // };

  return (
    <>
      <main className=" flex min-h-screen flex-col items-center justify-between  text-primary3  ">
        <div
          id="about"
          className="flex flex-col-reverse gap-4 lg:flex-row justify-between items-center lg:items-start  w-full h-fit py-14 bg-white px-4 lg:px-32"
        >
          <div className="flex flex-col justify-center  w-3/4">
            <div className="flex flex-col gap-4 xl:gap-12 justify-center   items-center lg:items-start">
              <h1 className="text-4xl xl:text-5xl 2xl:text-8xl font-bold text-center lg:text-start">
                Thank you <br />
                For visiting <br />
                My portofolio
              </h1>

              <span>
                I am a Front-End Developer with a strong passion for building
                high-performance, scalable, and user-friendly web applications.
                With hands-on experience in Next.js, Tailwind CSS, and Redux, I
                specialize in developing AI chatbot applications with generative
                AI (Gen AI) capabilities for enterprise clients.
              </span>

              <Link
                target="_blank"
                href={
                  "https://drive.google.com/file/d/1-7xsZz1kjkTFTsNZaNBllvmOQclNRKzG/view?usp=drive_link"
                }
                className="flex gap-2 w-60 items-center justify-center  rounded-xl px-2 py-4 mt-5 text-base cursor-pointer transition ease-in-out delay-150 bg-primary4 hover:bg-primary5 hover:-translate-y-1 hover:scale-110  duration-300 text-white"
              >
                <p>Download My CV</p>

                <BiArrowFromTop className="text-2xl transform transition-transform" />
              </Link>
            </div>
            <div className="flex flex-col lg:flex-row items-center gap-4 pt-10 xl:pt-20 2xl:pt-36">
              <p>Check Out My </p>
              <div className="flex items-center gap-4 p-2 text-2xl">
                <Link
                  className="flex p-4 rounded-full  bg-[#e0ddd8] bg-opacity-50 transition-colors duration-300 ease-in-out items-center hover:bg-opacity-90"
                  target="_blank"
                  href={`https://www.linkedin.com/in/ihsan-asfari-hanifan/`}
                >
                  <AiFillLinkedin />
                </Link>
                <Link
                  className="flex p-4 rounded-full  bg-[#e0ddd8] bg-opacity-50 transition-colors duration-300 ease-in-out items-center hover:bg-opacity-90"
                  target="_blank"
                  href={`https://github.com/Ihsanasfari?tab=repositories`}
                >
                  <AiFillGithub />
                </Link>
                <button
                  className="flex p-4 rounded-full  bg-[#e0ddd8] bg-opacity-50 transition-colors duration-300 ease-in-out items-center hover:bg-opacity-90 cursor-pointer"
                  target="_blank"
                  // onClick={handleOpen}
                >
                  <HiOutlineMail />
                </button>
              </div>
            </div>
          </div>
          <div className=" group flex flex-col gap-4 xl:gap-14 w-full  bg-primary2 border-2 border-primary3  items-center justify-center p-4 xl:p-10">
            <span className="lg:text-2xl font-semibold">
              " Power isn't determined by your size, <br />
              but the size of your heart and dreams! "
            </span>
            <div className="flex items-center justify-center p-16 xl:p-20 rounded-full bg-[#e0ddd8] bg-opacity-60 ">
              <Image
                className="animate-none w-60 xl:w-[400px]"
                width={400}
                height={300}
                src={myprofile}
                alt="myprofile"
              />
            </div>
          </div>
        </div>
        <div id="projects" className="flex w-full py-32 bg-primary2 ">
          <div className="flex flex-col gap-10  px-4 lg:px-32 justify-center">
            <h1 className="text-4xl xl:text-5xl 2xl:text-8xl font-bold">
              My <br />
              Project
            </h1>
            <ProjectList />
          </div>
        </div>
        <div
          id="experiences"
          className="flex flex-col lg:flex-row gap-8 lg:gap-0  lg:items-start justify-center lg:justify-between w-full py-28  px-8 lg:px-32"
        >
          <div className="flex flex-col gap-10 lg:w-3/4">
            <h1 className="text-4xl xl:text-5xl 2xl:text-8xl font-bold">
              Skills & <br />
              Experience
            </h1>

            <div className="flex flex-col ">
              <h2 className="text-4xl font-semibold pb-8">Skills</h2>

              <div className="grid grid-cols-3 gap-10 w-full lg:w-1/2">
                <div className="flex flex-col gap-4 items-center ">
                  <div className="flex  p-3 bg-primary3 text-white rounded-full text-4xl">
                    <BiLogoReact />
                  </div>
                  <span>React JS</span>
                </div>
                <div className="flex flex-col items-center gap-4">
                  <div className="flex  p-3 bg-primary3 text-white rounded-full text-4xl ">
                    <TbBrandNextjs />
                  </div>
                  <span>Next JS</span>
                </div>
                <div className="flex flex-col items-center gap-4">
                  <div className="flex  p-3 bg-primary3 text-white rounded-full text-4xl">
                    <BiLogoTailwindCss />
                  </div>
                  <span>Tailwind CSS</span>
                </div>
                <div className="flex flex-col items-center gap-4">
                  <div className="flex  p-3 bg-primary3 text-white rounded-full text-4xl">
                    <SiCodeigniter />
                  </div>
                  <span>CodeIgniter3</span>
                </div>
                <div className="flex flex-col items-center gap-4">
                  <div className="flex  p-3 bg-primary3 text-white rounded-full text-4xl">
                    <SiBootstrap />
                  </div>
                  <span>Bootstrap</span>
                </div>
                <div className="flex flex-col items-center gap-4">
                  <div className="flex  p-3 bg-primary3 text-white rounded-full text-4xl">
                    <RiJavascriptLine />
                  </div>

                  <span>JavaScript</span>
                </div>
                <div className="flex flex-col items-center gap-4">
                  <div className="flex  p-3 bg-primary3 text-white rounded-full text-4xl">
                    <BiLogoTypescript />
                  </div>

                  <span>TypeScript</span>
                </div>
              </div>
            </div>
          </div>
          <ExperienceList />
        </div>
        <footer className="flex flex-col  gap-2  w-full py-10 px-4 lg:px-32">
          <hr className="h-[2px] my-2 bg-primary3 border-0 " />
          <div className="flex flex-col lg:flex-row justify-between font-semibold">
            <span>ihsanasfarih@gmail.com</span>
            <div className="flex gap-4">
              <span>build with</span>
              <div className="flex items-center gap-4 text-primary4">
                <Link
                  className="hover:underline hover:underline-offset-2 decoration-primary5"
                  target="_blank"
                  href={"https://nextjs.org/"}
                >
                  Next.js
                </Link>
                <Link
                  className="hover:underline hover:underline-offset-2 decoration-primary5"
                  target="_blank"
                  href={"https://tailwindcss.com/"}
                >
                  Tailwind CSS
                </Link>
              </div>
            </div>
            <div className="flex gap-2">
              <span>deployed to</span>

              <Link
                className="hover:underline hover:underline-offset-2 text-primary4 decoration-primary5"
                target="_blank"
                href={"https://vercel.com/"}
              >
                Vercel
              </Link>
            </div>
          </div>
        </footer>
      </main>
      {/* {isOpen == true ? (
        <Modal text={"my email was copied to your clipboard!"} />
      ) : null} */}
    </>
  );
}
