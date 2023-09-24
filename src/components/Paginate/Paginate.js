import React from "react";
// import Pagination from "react-bootstrap/Pagination";
import "./Paginate.css";
import { Button } from "react-bootstrap";

export default function Paginate({
  currentPage,
  setCurrentPage,
  paginate,
  totalPages,
}) {
  const pageNumbers = [];

  for (let i = 1; i <= totalPages; i++) {
    pageNumbers.push(i);
  }

  //Pagination Handlers
  const handleFirstPage = () => {
    setCurrentPage(1);
  };
  const handleLastPage = () => {
    setCurrentPage(totalPages);
  };

  const handleNextPage = () => {
    setCurrentPage(currentPage + 1);
  };

  const handlePreviousPage = () => {
    setCurrentPage(currentPage - 1);
  };

  const handlePageClick = (pageNumbers) => {
    setCurrentPage(pageNumbers);
  };

  return (
    <div className="pagination-container">
      <div className="pagination-header">
        <span className="pageNo">
          Page {totalPages < 1 ? 0 : currentPage} of {totalPages}
        </span>
      </div>

      <div className="pagination">
        {/* 1st Page */}

        <Button className="paginateButton" onClick={handleFirstPage}>
          &lt;&lt;
        </Button>

        <Button className="paginateButton" onClick={handlePreviousPage}>
          &lt;
        </Button>

        {/* Showing Different Pages */}
        {pageNumbers.map((number) => (
          <Button
            className="paginateButton"
            key={number}
            onClick={() => handlePageClick(number)}
          >
            {number}
          </Button>
        ))}

        {/* Next Page */}

        <Button className="paginateButton" onClick={handleNextPage}>
          &gt;
        </Button>

        {/* Last Page */}
        <Button className="paginateButton" onClick={handleLastPage}>
          &gt;&gt;
        </Button>
      </div>
    </div>
  );
}
