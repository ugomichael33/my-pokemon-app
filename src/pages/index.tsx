import { useEffect, useState } from "react";
import Link from "next/link";

import { getPokemonTypes } from "../services/pokeApi";
import { PokemonType } from "../types";
import Layout from "@/components/Layout";

/**
 * HomePage component displays a list of all Pokémon types.
 * It fetches the list of types from the PokeAPI and renders them
 * as clickable items that navigate to a page showing all Pokémon of that type.
 */

const HomePage = () => {
  const [types, setTypes] = useState<PokemonType[]>([]);

  // Fetch Pokémon types on component mount
  useEffect(() => {
    const fetchTypes = async () => {
      const results = await getPokemonTypes();
      setTypes(results);
    };
    fetchTypes();
  }, []);

  return (
    <Layout>
      <div className="max-w-4xl mx-auto px-4 py-8">
        <h1 className="text-3xl font-bold text-center mb-6">Pokémon Types</h1>
        <ul className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
          {types.map((type) => (
            <li
              key={type.name}
              className="bg-blue-100 hover:bg-blue-200 rounded-md p-4 transition duration-300 ease-in-out"
            >
              <Link href={`/types/${type.name}`}>
                <span className="text-lg capitalize font-medium text-blue-800 hover:text-blue-600">
                  {type.name}
                </span>
              </Link>
            </li>
          ))}
        </ul>
      </div>
    </Layout>
  );
};

export default HomePage;
