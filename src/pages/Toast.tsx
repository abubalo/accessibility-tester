import React from 'react'

type Props = {
    onError: boolean;
    message: string;
}

const Toast = ({onError, message}: Props) => {
  return (
    <div
        className={`absolute bg-red-500 text-white px-4 py-2 top-5 right-2 transform  dark:bg-red-500 transition-all ease-linear duration-300 dark:text-white ${
          onError ? "translate-x-0" : "translate-x-[200%]"
        }`}
      >
        Error: {message}
      </div>
  )
}

export default Toast