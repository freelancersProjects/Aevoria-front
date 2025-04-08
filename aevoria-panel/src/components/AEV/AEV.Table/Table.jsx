import React, { useState } from 'react';
import PropTypes from 'prop-types';
import Checkbox from '../AEV.Checkbox/CheckBox';
import Button from '../AEV.Button/Button';
import './Table.scss';

const Table = ({ columns, rows, selectable = true, onAdd, onDelete }) => {
    const [selectedRows, setSelectedRows] = useState([]);

    const toggleSelect = (index) => {
        setSelectedRows((prev) =>
            prev.includes(index) ? prev.filter((i) => i !== index) : [...prev, index]
        );
    };

    const handleDelete = () => {
        const toDelete = selectedRows.map((index) => rows[index]);
        onDelete?.(toDelete);
        setSelectedRows([]);
    };

    return (
        <div className="aev-table">
            <div className="aev-table-header">
                {selectable && <div className="aev-table-cell checkbox-cell" />}
                {columns.map((col, index) => (
                    <div key={index} className="aev-table-cell header-cell">
                        {col.label}
                    </div>
                ))}

                {selectable && (
                    <div className="aev-table-actions">
                        <Button
                            text="Ajouter"
                            variant="solid"
                            size="small"
                            onClick={onAdd}
                            className="add-button"
                        />
                        {selectedRows.length > 0 && (
                            <Button
                                text="Supprimer"
                                variant="transparent"
                                size="small"
                                onClick={handleDelete}
                                className="delete-button"
                            />
                        )}
                    </div>
                )}
            </div>

            <div className="aev-table-body">
                {rows.map((row, rowIndex) => (
                    <div key={rowIndex} className="aev-table-row">
                        {selectable && (
                            <div className="aev-table-cell checkbox-cell">
                                <Checkbox
                                    checked={selectedRows.includes(rowIndex)}
                                    onChange={() => toggleSelect(rowIndex)}
                                />
                            </div>
                        )}
                        {columns.map((col, colIndex) => (
                            <div key={colIndex} className="aev-table-cell">
                                {row[col.key]}
                            </div>
                        ))}
                    </div>
                ))}
            </div>
        </div>
    );
};

Table.propTypes = {
    columns: PropTypes.arrayOf(
        PropTypes.shape({
            label: PropTypes.string.isRequired,
            key: PropTypes.string.isRequired,
        })
    ).isRequired,
    rows: PropTypes.arrayOf(PropTypes.object).isRequired,
    selectable: PropTypes.bool,
    onAdd: PropTypes.func,
    onDelete: PropTypes.func,
};

export default Table;
