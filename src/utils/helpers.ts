export const getPageData = <T>(
  pokemons: T[],
  currentPage: number,
  pokemonsPerPage: number
): T[] => {
  const startIndex = (currentPage - 1) * pokemonsPerPage;
  const endIndex = startIndex + pokemonsPerPage;
  return pokemons.slice(startIndex, endIndex);
};
