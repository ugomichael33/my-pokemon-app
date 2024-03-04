import axios from "axios";

import {
  PokemonType,
  Pokemon,
  PokemonDetails,
  PokemonTypesResponse,
} from "../types";

const BASE_URL = "https://pokeapi.co/api/v2";

export const getPokemonTypes = async (): Promise<PokemonType[]> => {
  try {
    const { data } = await axios.get<PokemonTypesResponse>(`${BASE_URL}/type`);
    return data.results;
  } catch (error) {
    console.error("Error fetching Pokemon types:", error);
    throw new Error("Failed to fetch Pokemon types");
  }
};

export const getPokemonsByType = async (type: string): Promise<Pokemon[]> => {
  try {
    const { data } = await axios.get<{ pokemon: { pokemon: Pokemon }[] }>(
      `${BASE_URL}/type/${type}`
    );
    return data.pokemon.map((p) => p.pokemon);
  } catch (error: any) {
    console.error(
      `Error fetching Pokemons of type ${type}:`,
      error.response?.data || error.message
    );
    throw new Error(`Failed to fetch Pokemons of type ${type}`);
  }
};

export const getPokemonDetails = async (
  name: string
): Promise<PokemonDetails> => {
  try {
    const { data } = await axios.get<PokemonDetails>(
      `${BASE_URL}/pokemon/${name}`
    );
    return data;
  } catch (error) {
    console.error(`Error fetching Pokemon details for ${name}:`, error);
    throw new Error(`Failed to fetch details for Pokemon ${name}`);
  }
};
