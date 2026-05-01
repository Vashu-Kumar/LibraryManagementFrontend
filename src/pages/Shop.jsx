import React, { useEffect, useState } from 'react'
import Title from '../components/Title'
import Item from '../components/Item'
import { dummyBooks } from "../assets/data";

const Shop = ({ searchQuery }) => {

  const books = dummyBooks;

  const [filteredBooks, setFilteredBooks] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);

  const itemsPerPage = 10;

  //  FILTER LOGIC
  useEffect(() => {
    const filtered = books.filter((book) =>
      (book.name || "").toLowerCase().includes(searchQuery.toLowerCase())
    );

    setFilteredBooks(filtered);
    setCurrentPage(1); // reset page on search
  }, [searchQuery, books]);

  //  PAGINATION LOGIC
  const totalPages = Math.ceil(filteredBooks.length / itemsPerPage);

  const startIndex = (currentPage - 1) * itemsPerPage;
  const paginatedBooks = filteredBooks.slice(
    startIndex,
    startIndex + itemsPerPage
  );

  //  PAGE HANDLERS
  const nextPage = () => {
    if (currentPage < totalPages) setCurrentPage(prev => prev + 1);
  };

  const prevPage = () => {
    if (currentPage > 1) setCurrentPage(prev => prev - 1);
  };

  return (
    <div className="max-padd-container py-16 pt-28">
      <Title
        title1={"All"}
        title2={"Books"}
        title1styles={"pb-10"}
      />

      {/* BOOK GRID */}
      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-5 sm:gap-8">
        {paginatedBooks.length > 0 ? (
          paginatedBooks.map((book, index) => (
            <Item key={book.id || index} book={book} />
          ))
        ) : (
          <h4 className="h4 col-span-full text-center">
            📚 No books found
          </h4>
        )}
      </div>

      {/*  PAGINATION CONTROLS */}
      {totalPages > 1 && (
        <div className="flex justify-center items-center gap-4 mt-10">
          <button
            onClick={prevPage}
            disabled={currentPage === 1}
            className="px-4 py-2 bg-black text-white rounded disabled:opacity-50"
          >
            Prev
          </button>

          <span className="font-medium">
            Page {currentPage} of {totalPages}
          </span>

          <button
            onClick={nextPage}
            disabled={currentPage === totalPages}
            className="px-4 py-2 bg-black text-white rounded disabled:opacity-50"
          >
            Next
          </button>
        </div>
      )}
    </div>
  )
}

export default Shop