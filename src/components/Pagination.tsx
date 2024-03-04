import { PaginationProps } from "@/types";

/**
 * Renders pagination controls for navigating through pages of Pokémon.
 * 
 * @param {Object} props - Component props
 * @param {number} props.pokemonsPerPage - Number of Pokémon displayed per page.
 * @param {number} props.totalPokemons - Total number of Pokémon across all pages.
 * @param {number} props.currentPage - Current active page number.
 * @param {Function} props.paginate - Function to call when changing pages.
 */

export default function Pagination({
  pokemonsPerPage,
  totalPokemons,
  currentPage,
  paginate,
}: PaginationProps) {

  // Determine the total number of pages needed
  const totalPages = Math.ceil(totalPokemons / pokemonsPerPage);

  const pageNumbersToShow = 5;
  let startPage = Math.max(1, currentPage - Math.floor(pageNumbersToShow / 2));
  let endPage = Math.min(totalPages, startPage + pageNumbersToShow - 1);

  const goToPreviousPage = () => {
    paginate(Math.max(1, currentPage - 1));
  };

  const goToNextPage = () => {
    paginate(Math.min(totalPages, currentPage + 1));
  };

   // Calculate the list of page numbers to render
  const pages = Array.from(
    { length: endPage - startPage + 1 },
    (_, idx) => startPage + idx
  );

  return (
    <nav className="flex items-center justify-center mt-4 ">
      {currentPage > 1 && (
        <i
          className="bi bi-chevron-left mr-2 px-3 py-1 cursor-pointer text-xl text-[#D1D1D6]"
          onClick={goToPreviousPage}
        ></i>
      )}
      <div className="bg-gray-100 rounded-xl">
        {pages.map((page) => (
          <button
            key={page}
            className={`mx-0 w-[29px] h-[29px] rounded-full ${
              page === currentPage
                ? "bg-[#FFD75C] text-white"
                : "hover:bg-gray-200"
            }`}
            onClick={() => paginate(page)}
          >
            {page}
          </button>
        ))}
      </div>

      {pokemonsPerPage < totalPokemons && (
        <i
          className="bi bi-chevron-right mr-2 px-3 py-1 cursor-pointer text-xl text-[#D1D1D6]"
          onClick={goToNextPage}
        ></i>
      )}
    </nav>
  );
}
