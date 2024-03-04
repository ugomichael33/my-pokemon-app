import { SearchBarProps } from "@/types";

/**
 * Renders a search input for filtering Pokémon by name.
 *
 * Utilizes a controlled component pattern, with the input value reflecting the `searchQuery` state
 * and using `setSearchQuery` to update it on change, facilitating real-time search filtering.
 *
 * @param {Object} props - Component props.
 * @param {string} props.searchQuery - Current value of the search input, reflecting the search query.
 * @param {Function} props.setSearchQuery - Function to update the search query state, triggered on input change.
 */

const SearchBar: React.FC<SearchBarProps> = ({
  searchQuery,
  setSearchQuery,
}) => {
  return (
    <input
      type="text"
      placeholder="Search Pokémon..."
      value={searchQuery}
      onChange={(e) => setSearchQuery(e.target.value)}
      className="w-1/2 p-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition duration-150 ease-in-out"
    />
  );
};

export default SearchBar;
