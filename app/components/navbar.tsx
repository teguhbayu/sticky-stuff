import { Link } from "@remix-run/react";

export default function Navbar() {
  return (
    <nav className="w-full h-16 flex justify-between bg-black py-3 px-5 text-white items-center fixed z-[9999] font-jetbrains">
      <Link to={"/"}>Sticky Stuff.</Link>
    </nav>
  );
}
