import { ReactNode } from "react";

export interface PokemonType {
    name: string;
    url: string;
  }
  
  export interface Pokemon {
    name: string;
    url: string;
  }
  
  export interface AbilityDetail {
    name: string;
    url: string;
  }
  
  export interface Ability {
    ability: AbilityDetail;
    is_hidden: boolean;
    slot: number;
  }
  
  export interface StatDetail {
    name: string;
    url: string;
  }
  
  export interface Stat {
    base_stat: number;
    effort: number;
    stat: StatDetail;
  }
  
  export interface TypeDetail {
    name: string;
    url: string;
  }
  
  export interface Type {
    slot: number;
    type: TypeDetail;
  }
  
  export interface MoveDetail {
    name: string;
    url: string;
  }
  
  export interface Move {
    move: MoveDetail;
  }
  
  export interface PokemonDetails {
    name: string;
    height: number;
    weight: number;
    abilities: Ability[];
    base_experience: number;
    forms: any[];
    game_indices: any[];
    held_items: any[];
    id: number;
    is_default: boolean;
    location_area_encounters: string;
    moves: Move[];
    order: number;
    past_types: any[];
    species: { name: string; url: string; };
    sprites: { front_default: string; [key: string]: any; };
    stats: Stat[];
    types: Type[];
  }

  export interface PokemonTypesResponse {
    count: number;
    next: string | null;
    previous: string | null;
    results: PokemonType[];
  }
  
  export interface LayoutProps {
    children: ReactNode;
    title?: string;
  };

  export interface PaginationProps {
    pokemonsPerPage: number;
    totalPokemons: number;
    currentPage: number;
    paginate: (page: number) => void;
  }

  export interface SearchBarProps {
    searchQuery: string;
    setSearchQuery: (query: string) => void;
  }