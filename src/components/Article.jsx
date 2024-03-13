import { Link } from "react-router-dom";

export default function Article({
  flags,
  name,
  population,
  region,
  subregion,
}) {
  return (
    <div>
      <Link to={`/${name.common}`}>
        <article className="bg-white hover:light:bg-gray-200 rounded-lg shadow overflow-hidden dark:bg-gray-800 dark:hover:bg-gray-700 transition-all duration-200">
          <img
            src={flags.svg}
            alt={flags.alt}
            className="md:h-72 w-full object-cover"
          />
          <div className="p-4">
            <h2 className="font-bold text-lg text-gray-900 mb-2 dark:text-white">
              {name.common}
            </h2>
            <ul className="flex flex-col items-start justify-start gap-2 dark:text-gray-300">
              <li>Population: {population.toLocaleString()}</li>
              <li>Region: {region}</li>
              <li>Subregion: {subregion}</li>
            </ul>
          </div>
        </article>
      </Link>
    </div>
  );
}
