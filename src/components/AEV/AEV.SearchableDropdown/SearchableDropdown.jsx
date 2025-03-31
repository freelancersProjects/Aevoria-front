import React, { useState } from 'react';
import PropTypes from 'prop-types';
import './SearchableDropdown.scss';

const SearchableDropdown = ({ options = [], value, onSelect, placeholder = "Search..." }) => {
    const [search, setSearch] = useState('');
    const [open, setOpen] = useState(false);

    const filtered = options.filter((opt) =>
        opt.label.toLowerCase().includes(search.toLowerCase())
    );

    const handleSelect = (val) => {
        onSelect(val);
        setOpen(false);
        setSearch('');
    };

    const selectedLabel = options.find(opt => opt.value === value)?.label || placeholder;

    return (
        <div className="aev-searchable-dropdown">
            <div className="selected" onClick={() => setOpen(!open)}>
                <span>{selectedLabel}</span>
                <span className="arrow">▼</span>
            </div>

            {open && (
                <div className="dropdown-content">
                    <input
                        type="text"
                        placeholder="Type to search..."
                        value={search}
                        onChange={(e) => setSearch(e.target.value)}
                        autoFocus
                    />

                    <div className="options">
                        {filtered.length > 0 ? (
                            filtered.map((opt, index) => (
                                <div
                                    key={index}
                                    className="option"
                                    onClick={() => handleSelect(opt.value)}
                                >
                                    {opt.label}
                                </div>
                            ))
                        ) : (
                            <div className="no-result">No match found</div>
                        )}
                    </div>
                </div>
            )}
        </div>
    );
};

SearchableDropdown.propTypes = {
    options: PropTypes.arrayOf(PropTypes.shape({
        label: PropTypes.string.isRequired,
        value: PropTypes.string.isRequired,
    })),
    value: PropTypes.string,
    onSelect: PropTypes.func.isRequired,
    placeholder: PropTypes.string,
};

export default SearchableDropdown;
