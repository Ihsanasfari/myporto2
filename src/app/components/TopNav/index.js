"use client";
import { Link as Scroll } from "react-scroll";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { AiFillLinkedin, AiFillGithub } from "react-icons/ai";
import { IoArrowBackOutline } from "react-icons/io5";
function TopNav() {
  const pathname = usePathname();

  const isHomePage = pathname === "/";

  return (
    <nav className="flex justify-center sticky top-0 z-10  text-neutral-700 bg-white text-primary3">
      <div className="max-w-screen-xl flex flex-wrap items-center justify-between md:flex-nowrap w-full   p-6">
        <Link href="/">Ihsan Asfari</Link>

        {isHomePage ? (
          <div className="flex items-center gap-4  mx-10 flex-wrap font-semibold ">
            <Scroll
              className="cursor-pointer hover:text-primary4  "
              to="about"
              spy={true}
              smooth={true}
              offset={-300}
              duration={500}
            >
              About
            </Scroll>

            <Scroll
              className="cursor-pointer hover:text-primary4 "
              to="projects"
              spy={true}
              smooth={true}
              offset={-60}
              duration={500}
            >
              Project
            </Scroll>
            <Scroll
              className="cursor-pointer hover:text-primary4 "
              to="experiences"
              spy={true}
              smooth={true}
              offset={-50}
              duration={500}
            >
              Skills & Experience
            </Scroll>
          </div>
        ) : (
          <div className="flex items-center gap-4  mx-10 flex-wrap">
            <Link
              className="flex  items-center gap-2 cursor-pointer hover:text-primary4 "
              href="/"
            >
              <IoArrowBackOutline />
              <p>Back</p>
            </Link>
          </div>
        )}

        <div className="flex items-center gap-4  mx-10 flex-wrap ">
          <Link
            className="flex gap-1 items-center hover:underline"
            target="_blank"
            href={`https://www.linkedin.com/in/ihsan-asfari-hanifan/`}
          >
            <span>Linkedin</span>
            <AiFillLinkedin />
          </Link>
          <Link
            className="flex gap-1 items-center hover:underline"
            target="_blank"
            href={`https://github.com/Ihsanasfari?tab=repositories`}
          >
            <span>Github</span>
            <AiFillGithub />
          </Link>
        </div>
      </div>
    </nav>
  );
}
export default TopNav;
