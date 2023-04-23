import axios from "axios";
import React, { useEffect, useState } from "react";
import Loader from "./Loader";

type pa11yResults = {
  message: string;
  context: string;
}[];

export default function Home() {
  const [inputValue, setInputValue] = useState<string>("");
  const [results, setResults] = useState<pa11yResults>([]);
  const [onError, setOnError] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  async function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault()
    try {
      setIsLoading(true);
      const response = await axios.post("/api/server", { url: inputValue });
      const {issues} = await response.data;
      setResults(issues);
    } catch (error: any) {
      setErrorMessage(error.message);
      setOnError(true);
    }
    setInputValue("");
    setIsLoading(false);
  }

  useEffect(()=>{
    if(onError){
      setTimeout(()=>{
        setOnError(false)
      },3000)
    }
  },[onError])
  return (
    <main className={`relative min-h-screen p-24 `}>
      <div className="flex flex-col items-center justify-center mb-12 space-y-4">
        <div className="w-full space-y-3 text-center">
          <h1 className="text-3xl font-semibold lg:text-6xl">
            Website Accessibilty Tester
          </h1>
          <p>Get a realtime feedback about your website performance</p>
        </div>
        <form onSubmit={handleSubmit} className="flex w-5/6 gap-2 p-3 border border-gray-500 rounded-md lg:w-1/2">
          <input
            value={inputValue}
            type="text"
            onChange={(e) => setInputValue(e.target.value.trim())}
            placeholder="Enter website url"
            className="w-full bg-transparent focus:outline-none"
            autoFocus
          />
          <button
            type="submit"
            className="transition-all duration-300 transform hover:-rotate-45 active:scale-90"
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
                d="M6 12L3.269 3.126A59.768 59.768 0 0121.485 12 59.77 59.77 0 013.27 20.876L5.999 12zm0 0h7.5"
              />
            </svg>
          </button>
        </form>
      </div>
      <div className="space-y-3">
        {isLoading && <Loader />}
        {results &&
          results.length > 0 &&
          results.map((result) => (
            <div
              key={result.message}
              className="flex flex-col w-full p-6 space-y-3 border border-gray-300 rounded-lg bg-gradient-to-b from-zinc-200 backdrop-blur-2xl dark:border-neutral-800 dark:bg-zinc-800/30 dark:from-inherit lg:p-4 lg:w-auto"
            >
              <p>{result.message}</p>
              <code className="block p-2 bg-gray-300 rounded-md dark:bg-neutral-300/20">
                {result.context}
              </code>
            </div>
          ))}
      </div>
      <div
        className={`absolute bg-red-500 px-4 py-2 top-5 right-2 transform  dark:bg-white dark:text-red-500 ${onError ? "translate-x-0" : "translate-x-full"}`}>Error: {errorMessage}</div>
    </main>
  );
}
