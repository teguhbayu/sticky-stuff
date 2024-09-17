import { Link } from "@remix-run/react";

export default function Index() {
  return (
    <main className="relative w-full min-h-screen">
      <div className="flex absolute top-[50%] -translate-y-[70%] left-[50%] -translate-x-1/2 justify-center flex-col gap-2 items-center text-[#ffd768] text-center w-full">
        <h1 className="text-2xl font-bold text-[#ffc014] drop-shadow-glow-yellow">
          Welcome to Sticky Stuff!
        </h1>
        <h3 className="text-xl">built using Remix.js</h3>
        <Link
          to={"/stickies"}
          className="underline text-[#ffc115] hover:text-[#b68f25] transition-all duration-300"
        >
          Try it now!
        </Link>
      </div>
    </main>
  );
}
