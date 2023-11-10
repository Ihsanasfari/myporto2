import Image from "next/image";
import myprofile from "/public/images/profile card.webp";
import { MdOutlineMaximize } from "react-icons/md";
import { AiFillLinkedin, AiFillGithub, AiFillInstagram } from "react-icons/ai";
import { BiArrowFromTop } from "react-icons/bi";
import Link from "next/link";
import ProjectList from "./components/ProjectList";

export default function Home() {
  const fileUrl = "/public/file/Ihsan Asfari Hanifan.pdf";
  const filename = "Ihsan Asfari Hanivan.pdf";
  return (
    <>
      <main className=" flex min-h-screen flex-col items-center justify-between  text-black  ">
        <div
          id="about"
          className="flex justify-between  w-full h-[900px] py-10 bg-white"
        >
          <div className="flex flex-col justify-center  w-3/4 px-28 ">
            <div className="flex flex-col gap-12 ">
              <h1 className="text-8xl font-bold">
                Thank you <br />
                For visiting <br />
                My portofolio
              </h1>
              <div className="flex gap-4">
                <MdOutlineMaximize className="w-40 h-16" />
                <span>
                  Hi! I'm a recent Telkom University graduate with a degree in
                  Software Engineering, passionate about front-end development.
                  I have experience working with React.js, Next.js, and Redux,
                  and I'm dedicated to creating engaging web experiences. Check
                  out my portfolio for my latest projects.
                </span>
              </div>
              <Link
                target="_blank"
                href={
                  "https://drive.google.com/file/d/1s0_Rq70JXFS-ZS-kG2QKlceIZW0_QS60/view?usp=sharing"
                }
                className="flex gap-2 w-60 items-center justify-center  rounded-xl px-2 py-4 mt-5 text-base cursor-pointer transition ease-in-out delay-150 bg-primary4 hover:bg-primary5 hover:-translate-y-1 hover:scale-110  duration-300 text-white"
              >
                <p>Download My CV</p>

                <BiArrowFromTop className="text-2xl transform transition-transform" />
              </Link>
            </div>
            <div className="flex items-center gap-4 pt-32">
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
                <Link
                  className="flex p-4 rounded-full  bg-[#e0ddd8] bg-opacity-50 transition-colors duration-300 ease-in-out items-center hover:bg-opacity-90"
                  target="_blank"
                  href={`https://github.com/Ihsanasfari?tab=repositories`}
                >
                  <AiFillInstagram />
                </Link>
              </div>
            </div>
          </div>
          <div className=" group flex flex-col gap-14 w-full  bg-primary2 border-2 border-primary3  items-center justify-center">
            <span className="text-2xl font-semibold">
              " Power isn't determined by your size, <br />
              but the size of your heart and dreams! "
            </span>
            <div className="flex items-center justify-center p-20 rounded-full bg-[#e0ddd8] bg-opacity-60 ">
              <Image
                className="animate-none"
                width={400}
                height={300}
                src={myprofile}
                alt="myprofile"
              />
            </div>
          </div>
        </div>
        <div id="projects" className="flex w-full h-[900px] py-10 bg-primary2">
          <div className="flex flex-col gap-10 px-28 ">
            <h1 className="text-8xl font-bold">
              My <br />
              Project
            </h1>
            <ProjectList />
          </div>
        </div>
        <div id="experiences" className="flex w-full h-[900px] py-10 ">
          <div className="flex flex-col gap-10 px-28 ">
            <h1 className="text-8xl font-bold">
              My <br />
              Experiences
            </h1>
          </div>
        </div>
        <footer className="flex flex-col gap-2 items-center justify-center w-full py-10">
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
        </footer>
      </main>
    </>
  );
}
