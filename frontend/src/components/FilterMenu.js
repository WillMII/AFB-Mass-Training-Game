import { useState } from "react";
import Offcanvas from 'react-bootstrap/Offcanvas'
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';

const FilterMenu = ({ show, handleClose, applyFilters }) => {
    const [filters, setFilters] = useState([{ type: "", value: "" }]);

    const squadronOptions = ["Squadron 1", "Squadron 2", "Squadron 3", "N/A"];
    const flightOptions = ["Flight A", "Flight B", "Flight C", "N/A"];

    const filterOptions = [
        { label: "First Name", value: "first_name" },
        { label: "Last Name", value: "last_name" },
        { label: "Squadron", value: "squadron" },
        { label: "Flight", value: "flight" },
        { label: "Module 1 Status", value: "module1" },
        { label: "Module 2 Status", value: "module2" },
        { label: "Module 3 Status", value: "module3" },
        { label: "All Modules", value: "all_modules" }
    ];

    const handleAddFilter = () => {
        setFilters([...filters, { type: "", value: "" }]);
    };

    const handleClearFilters = () => {
        setFilters([{ type: "", value: "" }]);
    };

    const handleRemoveFilter = (index) => {
        setFilters(filters.filter((_, i) => i !== index));
    };

    const handleFilterChange = (index, key, value) => {
        const updatedFilters = [...filters];
        updatedFilters[index][key] = value;
        setFilters(updatedFilters);
    };

    const handleApplyFilters = () => {
        applyFilters(filters);
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
                            ) : ["module1", "module2", "module3", "all_modules"].includes(filter.type) ? (
                                <Form.Select
                                    value={filter.value}
                                    onChange={(e) => handleFilterChange(index, "value", e.target.value)}
                                    className="me-2"
                                >
                                    <option value="">Select Status</option>
                                    <option value="complete">Complete</option>
                                    <option value="incomplete">Incomplete</option>
                                </Form.Select>
                            ) : (
                                <Form.Control
                                    type="text"
                                    value={filter.value}
                                    onChange={(e) => handleFilterChange(index, "value", e.target.value)}
                                    placeholder="Enter value"
                                    className="me-2"
                                />
                            )}

                            <div onClick={() => handleRemoveFilter(index)}>
                                <i class="bi bi-x-lg"></i>
                            </div>
                        </div>
                    ))}

                    <div className="d-flex justify-content-between mb-3">
                        <Button variant="link" onClick={handleAddFilter} style={{ textDecoration: "none" }}>
                            + Add Filter
                        </Button>
                        <Button variant="link" onClick={handleClearFilters} style={{ textDecoration: "none" }}>
                        <i class="bi bi-x"></i> Clear All
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
