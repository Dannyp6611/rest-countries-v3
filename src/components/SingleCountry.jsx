import { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";

export default function SingleCountry() {
  const [country, setCountry] = useState([]);
  const { name } = useParams();

  useEffect(
    function () {
      const getSingleCountry = async () => {
        try {
          const res = await fetch(
            `https://restcountries.com/v3.1/name/${name}`
          );
          if (!res.ok) throw new Error("Could not fetch the country");
          const data = await res.json();
          setCountry(data);
        } catch (error) {
          console.error(error);
        }
      };

      getSingleCountry();
    },
    [name]
  );

  useEffect(
    function () {
      document.title = `Countries | ${name}`;
    },
    [name]
  );

  return (
    <>
      <section className="p-8 md:py-0 max-w-7xl mx-auto">
        {country.map((item) => (
          <div
            key={item.population}
            className="grid grid-cols-1 gap-8 md:grid-cols-2 md:place-items-center md:h-screen"
          >
            <article>
              <img
                src={item.flags.svg}
                alt={item.flags.alt || item.name.common}
              />
            </article>
            <article>
              <h1 className="mb-8 font-bold text-gray-900 text-4xl lg:text-6xl dark:text-white">
                {item.name.official}
              </h1>
              <ul className="flex flex-col items-start justify-start gap-2 my-4 text-slate-700 dark:text-gray-400">
                <li>Capital: {item.capital[0]}</li>
                <li>Population: {item.population.toLocaleString()}</li>
                <li>Region: {item.region}</li>
                <li>Subregion: {item.subregion}</li>
                <li>Currency:</li>
              </ul>

              {item.borders?.length && (
                <>
                  <h3 className="text-gray-900 font-bold mb-2 dark:text-white">
                    Borders
                  </h3>
                  <ul className="flex flex-wrap items-start justify-start gap-2">
                    {item.borders.map((border, index) => (
                      <li
                        className="bg-white p-2 rounded text-xs tracking-wide shadow dark:bg-gray-800 hover:bg-gray-200 dark:text-gray-400 text-gray-700 cursor-pointer"
                        key={index}
                      >
                        {border}
                      </li>
                    ))}
                  </ul>
                </>
              )}

              <Link
                to="/"
                className="inline-block mt-8 bg-white py-2 px-6 rounded shadow text-gray-700 hover:bg-gray-200 transition-all duration-200 dark:bg-gray-800 dark:hover:bg-gray-700 dark:text-gray-200"
              >
                &larr; Back
              </Link>
            </article>
          </div>
        ))}
      </section>
    </>
  );
}
