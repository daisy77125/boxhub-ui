import React, { useEffect, useState, useMemo } from "react";

const Pagination = ({
  total = 0,
  itemsPerPage = 10,
  currentPage = 1,
  onPageChange,
}) => {
  const [totalPages, setTotalPages] = useState(0);

  useEffect(() => {
    if (total > 0 && itemsPerPage > 0)
      setTotalPages(Math.ceil(total / itemsPerPage));
    else {
      setTotalPages(0);
    }
  }, [total, itemsPerPage]);

  const paginationItems = useMemo(() => {
    const pages = [];

    for (let i = 1; i <= totalPages; i++) {
      pages.push(
        <li
          key={i}
          className={`page-item ${i === currentPage ? "active" : ""}`}
        >
          <a className="page-link" href="#" onClick={() => onPageChange(i)}>
            {i}
          </a>
        </li>

        // <Pagination.Item
        //     key={i}
        //     active={i === currentPage}
        //     onClick={() => onPageChange(i)}
        //   >
        //     {i}
        //   </Pagination.Item>
      );
    }

    return pages;
  }, [totalPages, currentPage]);

  if (totalPages === 0) return null;

  return (
    <nav>
      <ul className="pagination">
        {/* <Pagination.Prev
          onClick={() => onPageChange(currentPage - 1)}
          disabled={currentPage === 1}
        /> */}

        <li className={`page-item ${currentPage === 1 ? "disabled" : ""}`}>
          <a
            className="page-link"
            href="#"
            onClick={() => onPageChange(currentPage - 1)}
          >
            <span>&laquo;</span>
          </a>
        </li>

        {paginationItems}

        {/* <Pagination.Next
          onClick={() => onPageChange(currentPage + 1)}
          disabled={currentPage === totalPages}
        /> */}

        <li
          className={`page-item ${
            currentPage === totalPages ? "disabled" : ""
          }`}
        >
          <a
            className="page-link"
            href="#"
            onClick={() => onPageChange(currentPage + 1)}
          >
            <span>&raquo;</span>
          </a>
        </li>
      </ul>
    </nav>
  );
};

export default Pagination;
