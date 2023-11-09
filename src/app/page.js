import Image from "next/image";
import TopNav from "./components/TopNav";
import myprofile from "/public/images/profile card.png";
import { MdOutlineMaximize } from "react-icons/md";
import { AiFillLinkedin, AiFillGithub, AiFillInstagram } from "react-icons/ai";
import Link from "next/link";
export default function Home() {
  return (
    <>
      <TopNav />
      <main className="flex min-h-screen flex-col items-center justify-between  text-black  ">
        <div className="flex justify-between  w-full h-[900px] ">
          <div className="flex flex-col justify-center  w-3/4 ">
            <div className="flex flex-col gap-12 ">
              <h1 className="text-8xl font-bold">
                Thank you <br />
                for visiting <br />
                My Portofolio
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
          <div className="flex flex-col gap-14 w-full bg-primary2 border-2 border-primary3  items-center justify-center">
            <span className="text-2xl font-semibold">
              " Power isn't determined by your size, <br />
              but the size of your heart and dreams! "
            </span>
            <div className="flex items-center justify-center p-20   rounded-full bg-[#e0ddd8] bg-opacity-50 ">
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
        <div className="flex justify-between  bg-primary2 w-full h-[1000px] py-20"></div>
      </main>
    </>
  );
}
