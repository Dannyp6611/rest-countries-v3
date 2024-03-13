import { useState, useEffect } from "react";
import Article from "./Article";
import { useNavigate } from "react-router-dom";

export default function Countries() {
  const [countries, setCountries] = useState([]);
  const [searchText, setSearchText] = useState("");

  const navigate = useNavigate();

  const regions = [
    {
      name: "Europe",
    },
    {
      name: "Asia",
    },
    {
      name: "Africa",
    },
    {
      name: "Oceania",
    },
    {
      name: "Americas",
    },
    {
      name: "Antarctic",
    },
  ];

  async function searchCountry() {
    try {
      const res = await fetch(
        `https://restcountries.com/v3.1/name/${searchText}`
      );

      if (!res.ok) {
        navigate("/not-found");
      }

      const data = await res.json();
      setCountries(data);
    } catch (error) {
      console.error(error);
    }
  }

  async function filterByRegion(region) {
    try {
      const res = await fetch(
        `https://restcountries.com/v3.1/region/${region}`
      );
      const data = await res.json();
      setCountries(data);
    } catch (error) {
      console.error(error);
    }
  }

  function handleSearchCountry(e) {
    e.preventDefault();

    if (searchText === "") return;
    searchCountry();
  }

  function handleFilterByRegion(e) {
    e.preventDefault();
    filterByRegion();
  }

  useEffect(function () {
    const getCountries = async () => {
      try {
        const res = await fetch("https://restcountries.com/v3.1/all");
        const data = await res.json();
        setCountries(data);
      } catch (error) {
        console.error(error.message);
      }
    };

    getCountries();
  }, []);

  return (
    <>
      {!countries.length ? (
        <h1 className="text-gray-900 font-bold uppercase tracking-wide flex items-center justify-center text-center h-screen text-4xl dark:text-white">
          Loading...
        </h1>
      ) : (
        <section className="container mx-auto p-8">
          <div className="flex flex-col gap-4 md:flex-row md:items-center mb-8">
            <form
              onSubmit={handleSearchCountry}
              autoComplete="off"
              className="max-w-4xl md:flex-1"
            >
              <input
                value={searchText}
                onChange={(e) => setSearchText(e.target.value)}
                type="text"
                id="search"
                name="search"
                placeholder="Search for a country by its name..."
                className="py-3 px-4 text-gray-600 placeholder:text-gray-600 w-full shadow rounded outline-none dark:text-gray-400 dark:placeholder:text-gray-400 dark:bg-gray-800 dark:focus:bg-gray-700 transition-all duration-200"
                required
              />
            </form>

            <form onSubmit={handleFilterByRegion} className="md:ml-auto">
              <select
                name="filter-by-region"
                id="filter-by-region"
                className="w-52 py-3 px-4 outline-none shadow rounded text-gray-600 dark:text-gray-400 dark:bg-gray-800 dark:focus:bg-gray-700"
                value={regions.name}
                onChange={(e) => filterByRegion(e.target.value)}
              >
                {regions.map((region, idx) => (
                  <option value={region.name} key={idx}>
                    {region.name}
                  </option>
                ))}
              </select>
            </form>
          </div>
          <div className="grid grid-cols-1 gap-8 md:grid-cols-2 lg:grid-cols-3 2xl:grid-cols-4">
            {countries.map((country) => (
              <Article key={country.name.common} {...country} />
            ))}
          </div>
        </section>
      )}
    </>
  );
}
