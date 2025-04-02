import React from 'react';
import PropTypes from 'prop-types';
import './SearchBar.scss';
import { FaSearch } from 'react-icons/fa';

const SearchBar = ({ value, onChange, onSearch, placeholder = 'Search something epic...' }) => {
    const handleKeyDown = (e) => {
        if (e.key === 'Enter' && onSearch) {
            onSearch(value);
        }
    };

    return (
        <div className="aev-searchbar-wrapper">
            <FaSearch className="search-icon" />
            <input
                type="text"
                className="searchbar-input"
                value={value}
                onChange={(e) => onChange(e.target.value)}
                onKeyDown={handleKeyDown}
                placeholder={placeholder}
            />
        </div>
    );
};

SearchBar.propTypes = {
    value: PropTypes.string.isRequired,
    onChange: PropTypes.func.isRequired,
    onSearch: PropTypes.func,
    placeholder: PropTypes.string,
};

export default SearchBar;
