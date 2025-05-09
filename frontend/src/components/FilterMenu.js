import { useState } from "react";
import Offcanvas from 'react-bootstrap/Offcanvas'
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';

const FilterMenu = ({ show, handleClose, applyFilters, resetFilters, filter_mods, filter_manager }) => {
    const [filters, setFilters] = useState([{ type: "", value: "" }]);

    const squadronOptions = ["577th Squadron", "578th Squadron", "579th Squadron", "580th Squadron", "581st Squadron", "Directorate", "N/A"];
    const flightOptions = ["A", "B", "C", "N/A"];

    let filterOptions = [
        { label: "Squadron", value: "squadron" },
        { label: "Flight", value: "flight" },
    ];
    if (filter_mods) {
        filterOptions = filterOptions.concat([
            { label: "STINFO", value: "module1Progress" },
            { label: "Records Management", value: "module2Progress" },
            { label: "No FEAR Act", value: "module3Progress" },
            { label: "All Modules", value: "all_modules" }
        ]);
    }
    if (filter_manager) {
        filterOptions = filterOptions.concat([
            { label: "Training Manager", value: "manager" }
        ]);
    }

    const handleAddFilter = () => setFilters([...filters, { type: "", value: "" }]);
    const handleClearFilters = () => {
        setFilters([{ type: "", value: "" }]);
        resetFilters();
    }
    const handleRemoveFilter = (index) => {
        setFilters((prevFilters) => {
            if (prevFilters.length === 1) {
                const resetFilter = [{ type: "", value: "" }];
                applyFilters({});
                return resetFilter;
            }

            const updatedFilters = prevFilters.filter((_, i) => i !== index);

            // Convert filters to the correct format and pass to AdminNav
            const filterParams = updatedFilters.reduce((acc, filter) => {
                if (filter.type && filter.value) {
                    acc[filter.type] = filter.value;
                }
                return acc;
            }, {});

            applyFilters(filterParams); // Ensure filters update in AdminNav
            return updatedFilters;
        });
    };

    const handleFilterChange = (index, key, value) => {
        const updatedFilters = [...filters];
        updatedFilters[index][key] = value;
        setFilters(updatedFilters);
    };

    const handleApplyFilters = () => {
        const filterParams = filters
            .filter(f => f.type && f.value) //Remove empty filters
            .reduce((acc, filter) => {
                acc[filter.type] = filter.value;
                return acc;
            }, {});
        applyFilters(filterParams);
        handleClose();
    };

    return (
        <Offcanvas show={show} onHide={handleClose} placement="end">
            <Offcanvas.Header closeButton>
                <Offcanvas.Title>Filters</Offcanvas.Title>
            </Offcanvas.Header>
            <Offcanvas.Body>
                <Form>
                    {filters.map((filter, index) => (
                        <div key={index} className="d-flex align-items-center mb-3">
                            {/* select filter type */}
                            <Form.Select
                                value={filter.type}
                                onChange={(e) => handleFilterChange(index, "type", e.target.value)}
                                className="me-2"
                            >
                                <option value="">Select Filter</option>
                                {filterOptions.map((option) => (
                                    <option key={option.value} value={option.value}>
                                        {option.label}
                                    </option>
                                ))}
                            </Form.Select>

                            {/* determine right side after filter type chosen */}
                            {filter.type === "squadron" ? (
                                <Form.Select
                                    value={filter.value}
                                    onChange={(e) => handleFilterChange(index, "value", e.target.value)}
                                    className="me-2"
                                >
                                    <option value="">Select Squadron</option>
                                    {squadronOptions.map((squadron) => (
                                        <option key={squadron} value={squadron}>
                                            {squadron}
                                        </option>
                                    ))}
                                </Form.Select>
                            ) : filter.type === "flight" ? (
                                <Form.Select
                                    value={filter.value}
                                    onChange={(e) => handleFilterChange(index, "value", e.target.value)}
                                    className="me-2"
                                >
                                    <option value="">Select Flight</option>
                                    {flightOptions.map((flight) => (
                                        <option key={flight} value={flight}>
                                            {flight}
                                        </option>
                                    ))}
                                </Form.Select>
                            ) : ["module1Progress", "module2Progress", "module3Progress", "all_modules"].includes(filter.type) ? (
                                <Form.Select
                                    value={filter.value}
                                    onChange={(e) => handleFilterChange(index, "value", e.target.value)}
                                    className="me-2"
                                >
                                    <option value="">Select Status</option>
                                    <option value="complete">Complete</option>
                                    <option value="not_complete">Not Complete</option>
                                </Form.Select>
                            ) : filter.type === "manager" ? (
                                <Form.Select
                                    value={filter.value}
                                    onChange={(e) => handleFilterChange(index, "value", e.target.value)}
                                    className="me-2"
                                >
                                    <option value="">Select Training Manager Status</option>
                                    <option value="true">Training Manager</option>
                                    <option value="false">Not Training Manager</option>
                                </Form.Select>
                            ) : (
                                <Form.Select
                                    type="text"
                                    disabled={!filter.type}
                                    value={filter.value}
                                    onChange={(e) => handleFilterChange(index, "value", e.target.value)}
                                    placeholder="Enter valsue"
                                    className="me-2"
                                />
                            )}

                            <button
                                type="button"
                                className="btn btn-link p-0 text-secondary"
                                onClick={() => handleRemoveFilter(index)}
                            >
                                <i className="bi bi-x-lg"></i>
                            </button>
                        </div>
                    ))}

                    <div className="d-flex justify-content-between mb-3">
                        <Button variant="link" onClick={handleAddFilter} style={{ textDecoration: "none" }}>
                            + Add Filter
                        </Button>
                        <Button variant="link" onClick={handleClearFilters} style={{ textDecoration: "none" }}>
                            <i className="bi bi-x"></i> Clear All
                        </Button>
                    </div>
                    <div className="d-flex justify-content-center">
                        <Button variant="primary" onClick={handleApplyFilters}>
                            Apply Filters
                        </Button>
                    </div>
                </Form>
            </Offcanvas.Body>
        </Offcanvas>
    );
};

export default FilterMenu;
