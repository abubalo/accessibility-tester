import React from "react";

type Props = {
  onError: boolean;
  message: string;
};

const Toast = ({ onError, message }: Props) => {
  return (
    <div
      className={`absolute  flex gap-2 text-white p-4 top-5 right-2 transform  dark:bg-red-400 transition-all ease-linear duration-300 dark:text-white rounded-md ${
        onError ? "translate-x-0" : "translate-x-[200%]"
      }`}
    >
      <svg
        xmlns="http://www.w3.org/2000/svg"
        fill="none"
        viewBox="0 0 24 24"
        strokeWidth={1.5}
        stroke="currentColor"
        className="w-6 h-6"
      >
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          d="M12 9v3.75m9-.75a9 9 0 11-18 0 9 9 0 0118 0zm-9 3.75h.008v.008H12v-.008z"
        />
      </svg>
      Error: {message}
    </div>
  );
};

export default Toast;
