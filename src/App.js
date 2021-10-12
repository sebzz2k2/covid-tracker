import React, { useEffect, useState } from "react";
import ReactLoading from "react-loading";
import axios from "axios";
import "./App.css";

const App = () => {
  const [countries, setcountries] = useState([]);
  const [loading, setLoading] = useState(true);
  useEffect(() => {
    const fetch = async () => {
      await axios
        .get("https://api.covid19api.com/summary")
        .then(function (res) {
          setcountries(res.data.Countries);
          setLoading(false);
          //   console.log(res.data.Countries);
        });
    };
    fetch();
  }, []);

  return (
    <>
      <h1 className="text-3xl font-bold flex justify-center pt-4 text-green-500">
        Covid Tracker Web App
      </h1>
      <p className="text-lg font-bold flex justify-center pt-4 text-gray-200">
        Powered by postaman API
      </p>
      {loading ? (
        <div className="flex justify-center p-48">
          <ReactLoading
            type={"bars"}
            color={"rgba(16, 185, 129)"}
            height={100}
            width={100}
          />
        </div>
      ) : (
        <section className="grid grid-cols-1 gap-10 p-7 md:grid-cols-2 lg:grid-cols-3">
          {countries.map((country) => {
            const {
              ID,
              Country,
              CountryCode,
              TotalDeaths,
              TotalRecovered,
              TotalConfirmed,
              NewDeaths,
              NewConfirmed,
              NewRecovered,
            } = country;

            return (
              <article
                className="my-5  bg-gray-700 p-7 rounded-2xl shadow-lg"
                key={ID}
              >
                <h3 className="flex justify-between text-xl font-semibold text-green-500 pb-5 ">
                  {Country} <span>{CountryCode}</span>
                </h3>
                <ul>
                  <li className="text-gray-200 flex justify-between">
                    New Deaths
                    <span className="font-semibold text-lg">{NewDeaths}</span>
                  </li>
                  <li className="text-gray-200 flex justify-between">
                    Total Deaths
                    <span className="font-semibold text-lg">{TotalDeaths}</span>
                  </li>
                  <li className="text-gray-200 flex justify-between">
                    New Comfirmed
                    <span className="font-semibold text-lg">
                      {NewConfirmed}
                    </span>
                  </li>
                  <li className="text-gray-200 flex justify-between">
                    Total Confirmed
                    <span className="font-semibold text-lg">
                      {TotalConfirmed}
                    </span>
                  </li>
                  <li className="text-gray-200 flex justify-between">
                    New Recovered
                    <span className="font-semibold text-lg">
                      {NewRecovered}
                    </span>
                  </li>
                  <li className="text-gray-200 flex justify-between">
                    Total Recovered
                    <span className="font-semibold text-lg">
                      {TotalRecovered}
                    </span>
                  </li>
                </ul>
              </article>
            );
          })}
        </section>
      )}
    </>
  );
};

export default App;
