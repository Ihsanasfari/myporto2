import Image from "next/image";
import TopNav from "./components/TopNav";
import myprofile from "/public/images/myprofile.webp";
import { MdOutlineMaximize } from "react-icons/md";
export default function Home() {
  return (
    <>
      <TopNav />
      <main className="flex min-h-screen flex-col items-center justify-between  text-black  ">
        <div className="flex justify-between border w-full h-[1000px] py-20">
          <div className="flex flex-col justify-center  w-8/12 border">
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
            <div className="flex gap-4 pt-44">
              <p>Check Out My </p>
              <p>Linkedin </p>
              <p>GIthub </p>
              <p>Instagram </p>
            </div>
          </div>
          <div className="flex w-full bg-primary2 border items-center justify-center">
            <Image width={400} height={300} src={myprofile} alt="myprofile" />
          </div>
        </div>
        <div className="flex justify-between border bg-primary2 w-full h-[1000px] py-20"></div>
      </main>
    </>
  );
}
