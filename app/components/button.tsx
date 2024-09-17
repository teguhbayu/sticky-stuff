import { ReactNode } from "react";

export default function SubmitButton({
  disabled,
  children,
}: {
  disabled: boolean;
  children: ReactNode;
}) {
  return (
    <button
      type="submit"
      disabled={disabled}
      className="rounded-md py-2 px-3 bg-[#ffad14] text-[#7c5b00] transition-all duration-300 hover:bg-[#df940a] hover:text-white"
    >
      {children}
    </button>
  );
}
