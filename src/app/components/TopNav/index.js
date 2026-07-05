"use client";
import { Link as Scroll } from "react-scroll";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { AiFillLinkedin, AiFillGithub } from "react-icons/ai";
import { IoArrowBackOutline } from "react-icons/io5";
import { useState } from "react";
import { RxHamburgerMenu } from "react-icons/rx";
import Image from "next/image";
function TopNav() {
  const pathname = usePathname();

  const isHomePage = pathname === "/";
  let [open, setOpen] = useState(false);
  console.log(open);
  return (
    <nav className="border flex justify-center sticky top-0 z-10  text-neutral-700 bg-white text-primary3">
      <div className="max-w-screen-xl flex flex-wrap items-center justify-between lg:flex-nowrap w-full   p-6">
        <Link className="flex items-center gap-2" href="/">
          <Image
            className="w-[130px] h-[68px] rounded-[10px]"
            src="/images/mylogo/ia_logo_2.webp"
            alt="logo"
            width={600}
            height={343}
          />
        </Link>
        {isHomePage ? (
          <button
            className="lg:hidden hover:bg-primary3 hover:bg-opacity-25 transition-all ease-in-out p-2 rounded-full"
            onClick={() => setOpen(!open)}
          >
            <RxHamburgerMenu size={22} />
          </button>
        ) : null}
        {isHomePage ? (
          <div
            className={`${
              open ? "visible" : "hidden"
            }  items-center justify-between w-full lg:flex lg:w-auto lg:order-1 static border border-primary4 rounded-md lg:rounded-none lg:border-0 p-4 lg:p-0`}
            id="menu"
          >
            <div className="flex flex-col font-bold lg:mr-44 mt-2 rounded-lg bg-white lg:flex-row lg:space-x-8 lg:mt-0 lg:bg-white">
              <Scroll
                className="block cursor-pointer hover:text-primary4 p-1 lg:p-0 hover:bg-primary2 lg:hover:bg-primary1 bg-opacity-20 rounded-xl transition-all ease-in-out "
                to="about"
                spy={true}
                smooth={true}
                offset={-300}
                duration={500}
              >
                About
              </Scroll>

              <Scroll
                className="block cursor-pointer hover:text-primary4 p-1 lg:p-0 hover:bg-primary2 lg:hover:bg-primary1 bg-opacity-20 rounded-xl transition-all ease-in-out "
                to="projects"
                spy={true}
                smooth={true}
                offset={-40}
                duration={500}
              >
                Project
              </Scroll>
              <Scroll
                className="block cursor-pointer hover:text-primary4 p-1 lg:p-0 hover:bg-primary2 lg:hover:bg-primary1 bg-opacity-20 rounded-xl transition-all ease-in-out "
                to="experiences"
                spy={true}
                smooth={true}
                offset={-50}
                duration={500}
              >
                Skills & Experience
              </Scroll>
            </div>
            <div className="flex flex-col font-bold  lg:gap-4 pt-1 lg:pt-0 lg:normal  lg:flex-row lg:items-center lg:mx-10 flex-wrap ">
              <Link
                className="flex gap-1 items-center lg:hover:text-primary3 lg:hover:underline  hover:text-primary4 p-1 lg:p-0 hover:bg-primary2 lg:hover:bg-primary1 bg-opacity-20 rounded-xl transition-all ease-in-out"
                target="_blank"
                href={`https://www.linkedin.com/in/ihsan-asfari-hanifan/`}
              >
                <span>Linkedin</span>
                <AiFillLinkedin />
              </Link>
              <Link
                className="flex gap-1 items-center lg:hover:text-primary3 lg:hover:underline  hover:text-primary4 p-1 lg:p-0 hover:bg-primary2 lg:hover:bg-primary1 bg-opacity-20 rounded-xl transition-all ease-in-out"
                target="_blank"
                href={`https://github.com/Ihsanasfari?tab=repositories`}
              >
                <span>Github</span>
                <AiFillGithub />
              </Link>
            </div>
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
      </div>
    </nav>
  );
}
export default TopNav;
