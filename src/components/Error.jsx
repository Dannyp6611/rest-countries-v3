import { Link } from "react-router-dom";

export default function Error() {
  return (
    <div className="text-slate-700 dark:text-gray-400 container mx-auto text-center flex flex-col h-screen items-center justify-center">
      <h1 className="text-4xl">
        That country can not be found please go back to the main page and try
        searching again
      </h1>
      <Link
        to="/"
        className="inline-block mt-8 bg-white py-2 px-6 rounded shadow text-gray-700 hover:bg-gray-200 transition-all duration-200 dark:bg-gray-800 dark:hover:bg-gray-700 dark:text-gray-200"
      >
        &larr; Back
      </Link>
    </div>
  );
}
