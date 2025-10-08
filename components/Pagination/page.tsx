import ReactPaginate from 'react-paginate';
import css from "./Pagination.module.css"

interface PaginationProps {
    pageCount: number,
    onPageChange: (page: number) => void,
    currentPage: number,

}
function Pagination  ({pageCount, onPageChange, currentPage}: PaginationProps) {
  
  if (typeof pageCount !== "number" || pageCount <= 1) return null;
if (typeof currentPage !== "number" || currentPage < 1) return null;

  
    return (
    <ReactPaginate
      className={css.pagination} 
      pageClassName={css.page} 
      activeClassName={css.active}
      previousClassName={css.prev}
      nextClassName={css.next} 
      breakClassName={css.break} 
      disabledClassName={css.disabled} 
      previousLabel="<"
      nextLabel=">" 
      breakLabel="..." 
      pageCount={pageCount} 
      forcePage={currentPage - 1}
      onPageChange= {(event) => onPageChange(event.selected + 1)} 
      
    />
  );
};

export default Pagination