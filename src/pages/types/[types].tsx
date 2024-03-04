import { useState, useEffect, useMemo } from "react";
import { useRouter } from "next/router";
import Link from "next/link";

import { getPokemonsByType } from "../../services/pokeApi";
import { Pokemon } from "../../types";
import Layout from "../../components/Layout";
import Pagination from "../../components/Pagination";
import { getPageData } from "@/utils/helpers";
import SearchBar from "@/components/SearchBar";
import { useDebounce } from "@/utils/hooks/useDeboune";

/**
 * Displays a list of Pokémon by type, includes a search functionality, and paginates the results.
 */

const TypePage = () => {
  const router = useRouter();
  const { types } = router.query;
  const [pokemons, setPokemons] = useState<Pokemon[]>([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [searchQuery, setSearchQuery] = useState("");
  const debouncedSearchQuery = useDebounce(searchQuery, 500);
  const pokemonsPerPage = 25;

  // Fetch Pokémon list by type when the component mounts or the type changes.
  useEffect(() => {
    if (types) {
      const fetchPokemons = async () => {
        const results = await getPokemonsByType(types as string);
        setPokemons(results);
      };
      fetchPokemons();
    }
  }, [types]);

  // Filter the Pokémon list based on the search query.
  const filteredPokemons = useMemo(() => {
    if (!debouncedSearchQuery) return pokemons;

    return pokemons.filter((pokemon) =>
      pokemon.name.toLowerCase().includes(debouncedSearchQuery.toLowerCase())
    );
  }, [debouncedSearchQuery, pokemons]);

  const indexOfLastPokemon = currentPage * pokemonsPerPage;
  const indexOfFirstPokemon = indexOfLastPokemon - pokemonsPerPage;
  const currentPokemons = getPageData(
    filteredPokemons,
    currentPage,
    pokemonsPerPage
  );

  const paginate = (pageNumber: number) => setCurrentPage(pageNumber);

  return (
    <Layout title={`${types} type pokemons`}>
      <h1 className="text-3xl md:text-4xl font-bold text-gray-800 dark:text-gray-200 text-center my-4 md:my-8 capitalize">
        {types} Type Pokémons
      </h1>
      <SearchBar searchQuery={searchQuery} setSearchQuery={setSearchQuery} />
      <ul className="grid grid-cols-2 gap-4">
        {currentPokemons.map((pokemon) => (
          <li key={pokemon.name} className="mb-2">
            <Link href={`/pokemon/${pokemon.name}`}>
              <div className="cursor-pointer text-blue-600 hover:text-blue-800 font-medium capitalize transition duration-150 ease-in-out block">
                {pokemon.name}
              </div>
            </Link>
          </li>
        ))}
      </ul>

      <Pagination
        pokemonsPerPage={pokemonsPerPage}
        totalPokemons={pokemons.length}
        currentPage={currentPage}
        paginate={paginate}
      />
    </Layout>
  );
};

export default TypePage;
