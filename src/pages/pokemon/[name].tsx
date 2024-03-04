import { useEffect, useState } from "react";
import { useRouter } from "next/router";
import Head from "next/head";

import { getPokemonDetails } from "../../services/pokeApi";
import { PokemonDetails } from "../../types";
import Layout from "@/components/Layout";

/**
 * The PokemonPage component fetches and displays detailed information
 * about a specific Pokémon. It uses the Pokémon name from the URL to
 * fetch the details from the PokeAPI.
 */

const PokemonPage = () => {
  const [pokemon, setPokemon] = useState<PokemonDetails | null>(null);
  const router = useRouter();
  const { name } = router.query;

  // Fetch Pokémon details based on the name parameter from the URL.
  useEffect(() => {
    if (name) {
      const fetchDetails = async () => {
        const details = await getPokemonDetails(name as string);
        setPokemon(details);
      };
      fetchDetails();
    }
  }, [name]);

  // Display a loading message if the Pokémon details are not yet fetched.
  if (!pokemon) return <div>Loading...</div>;

  return (
    <Layout>
      <div className="container mx-auto p-4">
        <Head>
          <title>{pokemon.name} | Pokémon Details</title>
          <meta name="description" content={`Details about ${pokemon.name}`} />
        </Head>
        <h1 className="text-4xl font-bold text-center my-8 text-blue-700 capitalize">
          {pokemon.name} Details
        </h1>
      </div>
      <div className="max-w-4xl mx-auto p-4">
        <div className="text-center mb-8">
          <h1 className="text-4xl font-bold capitalize">{pokemon.name}</h1>
          <img
            className="mx-auto mt-4"
            src={pokemon.sprites.front_default}
            alt={pokemon.name}
          />
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <h2 className="text-2xl font-semibold mb-2">Details</h2>
            <p className="mb-1">
              <strong>Height:</strong> {pokemon.height}
            </p>
            <p className="mb-1">
              <strong>Weight:</strong> {pokemon.weight}
            </p>
            <p className="mb-1">
              <strong>Base Experience:</strong> {pokemon.base_experience}
            </p>
          </div>

          <div>
            <h2 className="text-2xl font-semibold mb-2">Abilities</h2>
            <ul>
              {pokemon.abilities.map((ability, index) => (
                <li key={index} className="capitalize">
                  {ability.ability.name}
                </li>
              ))}
            </ul>
          </div>
        </div>

        <div>
          <h2 className="text-2xl font-semibold mt-4 mb-2">Stats</h2>
          <ul>
            {pokemon.stats.map((stat, index) => (
              <li key={index} className="capitalize">
                <strong>{stat.stat.name}:</strong> {stat.base_stat}
              </li>
            ))}
          </ul>
        </div>

        <div>
          <h2 className="text-2xl font-semibold mt-4 mb-2">Types</h2>
          <ul>
            {pokemon.types.map((type, index) => (
              <li key={index} className="capitalize">
                {type.type.name}
              </li>
            ))}
          </ul>
        </div>

        <div>
          <h2 className="text-2xl font-semibold mt-4 mb-2">Moves</h2>
          <ul className="grid grid-cols-2 md:grid-cols-4 gap-2">
            {pokemon.moves.map((move, index) => (
              <li key={index} className="capitalize">
                {move.move.name}
              </li>
            ))}
          </ul>
        </div>
      </div>
    </Layout>
  );
};

export default PokemonPage;
