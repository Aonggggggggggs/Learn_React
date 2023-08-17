import { useState, useEffect, Component } from "react";
import reactLogo from "./assets/react.svg";
import viteLogo from "/vite.svg";
import "./App.css";
import axios from "axios";
import ReactLoading from "react-loading";

// Component
import FavPoke from "./components/FavPoke";

function App() {
  const [poke, setPoke] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [number, setNumber] = useState(1);
  const [fav, setFav] = useState([]);
  useEffect(() => {
    let abortController = new AbortController();

    const loadPoke = async () => {
      try {
        setLoading(true);
        let response = await axios.get(
          `https://pokeapi.co/api/v2/pokemon/${number}`,
          {
            signal: abortController.signal,
          }
        );
        setPoke(response.data);
        setError("");
      } catch (error) {
        setError(error);
      } finally {
        setLoading(false);
      }
    };
    loadPoke();

    return () => abortController.abort();
  }, [number]);
  console.log(fav);
  const addFav = () => {
    setFav((oldState) => [...oldState, poke]);
  };
  const prevPoke = () => {
    setNumber((number) => number - 1);
  };
  const nextPoke = () => {
    setNumber((number) => number + 1);
  };
  return (
    <div className="block max-w-5px p-6 bg-white border border-gray-200 rounded-lg shadow hover:bg-gray-100 dark:bg-gray-800 dark:border-gray-700 dark:hover:bg-gray-700">
      <div className="grid sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-2">
        <div>
          {loading ? (
            <ReactLoading
              type="spin"
              height={"20%"}
              width={"20%"}
              color="grey"
            />
          ) : (
            <>
              {/* ดึงข้อมูลจาก API  */}
              {/* ข้อมูลปกติ */}
              <h1>{poke?.name}</h1>
              <br />
              <button onClick={addFav}>Add to Favourite</button>
              <br />
              <img
                src={poke?.sprites?.other?.home?.front_default}
                alt={poke?.name}
              />
              {/* เป็นArray */}
              <ul className="">
                {poke?.abilities?.map((abil, idx) => (
                  <li key={idx}>{abil.ability.name}</li>
                ))}
              </ul>
              <br />
              <div className="buttoms">
                <button onClick={nextPoke}> Next</button>
                <button onClick={prevPoke}> Prev</button>
              </div>
            </>
          )}
        </div>
        <div>
          <h2>your favourite pokemon</h2>
          <br />
          {fav.length > 0 ? (
            <FavPoke fav={fav} />
          ) : (
            <div className="flex justify-center h-full items-center font-wieth">
              <p>no favourite pokemon</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

export default App;
