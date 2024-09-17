import { Link } from "@remix-run/react";
import { FaGithub } from "react-icons/fa6";

export default function Footer() {
  return (
    <footer className="w-full h-[75px] sm:h-[50px] text-center flex justify-center items-center text-white">
      <h4 className="relative">
        Made by{" "}
        <Link
          to={"https://github.com/teguhbayu"}
          target="_blank"
          className="underline hover:text-[#ffc115] inline-flex gap-1 items-center transition-all duration-300 translate-y-[11%]"
        >
          <FaGithub /> teguhbayu
        </Link>{" "}
        using Remix.js
      </h4>
    </footer>
  );
}
