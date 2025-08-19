
import PropTypes from 'prop-types';
import Icon from '../AEV.Icon/Icon';
import './Pagination.scss';

const Pagination = ({ currentPage, totalPages, onPageChange }) => {
  const pages = [];

  for (let i = 1; i <= totalPages; i++) {
    pages.push(
      <button
        key={i}
        className={`page-btn ${i === currentPage ? 'active' : ''}`}
        onClick={() => onPageChange(i)}
      >
        {i}
      </button>,
    );
  }

  return (
    <div className="aev-pagination">
      <button
        className="nav-btn"
        onClick={() => onPageChange(currentPage - 1)}
        disabled={currentPage === 1}
      >
        <Icon name="chevron-left" size={18} />
      </button>
      {pages}
      <button
        className="nav-btn"
        onClick={() => onPageChange(currentPage + 1)}
        disabled={currentPage === totalPages}
      >
        <Icon name="chevron-right" size={18} />
      </button>
    </div>
  );
};

Pagination.propTypes = {
  currentPage: PropTypes.number.isRequired,
  totalPages: PropTypes.number.isRequired,
  onPageChange: PropTypes.func.isRequired,
};

export default Pagination;
