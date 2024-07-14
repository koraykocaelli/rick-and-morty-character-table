import React, { useState, useEffect, useCallback } from 'react';
import { getAllCharacters } from '../api';
import { Table, Button, Form, Spinner, InputGroup, FormControl } from 'react-bootstrap';
import './CharacterTable.css';

const CharacterTable = ({ onCharacterSelect }) => {
    const [characters, setCharacters] = useState([]);
    const [filteredCharacters, setFilteredCharacters] = useState([]);
    const [displayedCharacters, setDisplayedCharacters] = useState([]);
    const [page, setPage] = useState(1);
    const [nameFilter, setNameFilter] = useState('');
    const [statusFilter, setStatusFilter] = useState('');
    const [sortOrder, setSortOrder] = useState('asc');
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState('');
    const [itemsPerPage, setItemsPerPage] = useState(20); 

    const fetchCharacters = useCallback(async () => {
        setLoading(true);
        setError('');
        try {
            const allCharacters = await getAllCharacters();
            setCharacters(allCharacters);
            setFilteredCharacters(allCharacters);
        } catch (error) {
            setError('Error fetching data. Please try again later.');
            console.error(error);
        } finally {
            setLoading(false);
        }
    }, []);

    useEffect(() => {
        fetchCharacters();
    }, [fetchCharacters]);

    useEffect(() => {
        
        let filtered = characters;

        if (nameFilter) {
            filtered = filtered.filter(char => char.name.toLowerCase().includes(nameFilter.toLowerCase()));
        }

        if (statusFilter) {
            filtered = filtered.filter(char => char.status === statusFilter);
        }

       
        const sorted = filtered.sort((a, b) => {
            if (sortOrder === 'asc') {
                return a.name.localeCompare(b.name);
            } else {
                return b.name.localeCompare(a.name);
            }
        });

        setFilteredCharacters(sorted);
    }, [characters, nameFilter, statusFilter, sortOrder]);

    useEffect(() => {
        
        const startIndex = (page - 1) * itemsPerPage;
        const endIndex = startIndex + itemsPerPage;
        setDisplayedCharacters(filteredCharacters.slice(startIndex, endIndex));
    }, [filteredCharacters, page, itemsPerPage]);

    const handleFilter = () => {
        setPage(1); 
    };

    const handleSort = () => {
        setSortOrder(sortOrder === 'asc' ? 'desc' : 'asc');
    };

    const handleItemsPerPageChange = (event) => {
        setItemsPerPage(Number(event.target.value));
        setPage(1); 
    };

    return (
        <div className="character-table">
            {error && <div className="alert alert-danger">{error}</div>}
            <Form className="character-table__filter-form">
                <Form.Group controlId="formNameFilter">
                    <Form.Label>Name Filter</Form.Label>
                    <Form.Control
                        type="text"
                        placeholder="Enter name"
                        value={nameFilter}
                        onChange={(e) => setNameFilter(e.target.value)}
                    />
                </Form.Group>
                <Form.Group controlId="formStatusFilter">
                    <Form.Label>Status Filter</Form.Label>
                    <Form.Control
                        as="select"
                        value={statusFilter}
                        onChange={(e) => setStatusFilter(e.target.value)}
                    >
                        <option value="">Select status</option>
                        <option value="Alive">Alive</option>
                        <option value="Dead">Dead</option>
                        <option value="unknown">Unknown</option>
                    </Form.Control>
                </Form.Group>
                <Button variant="primary" onClick={handleFilter}>
                    Apply Filters
                </Button>
            </Form>

            <InputGroup className="mb-3">
                <InputGroup.Text>Items per page</InputGroup.Text>
                <FormControl
                    type="number"
                    min="1"
                    max="100"
                    value={itemsPerPage}
                    onChange={handleItemsPerPageChange}
                />
            </InputGroup>

            {loading ? (
                <div className="character-table__spinner">
                    <Spinner animation="border" role="status">
                        <span className="sr-only">Loading...</span>
                    </Spinner>
                </div>
            ) : (
                <Table striped bordered hover>
                    <thead className="character-table__header">
                        <tr>
                            <th onClick={handleSort} className={sortOrder === 'asc' ? 'sort-asc' : 'sort-desc'}>Name</th>
                            <th>Status</th>
                            <th>Species</th>
                            <th>Gender</th>
                        </tr>
                    </thead>
                    <tbody>
                        {displayedCharacters.map(char => (
                            <tr key={char.id} className="character-table__row" onClick={() => onCharacterSelect(char)}>
                                <td>{char.name}</td>
                                <td>{char.status}</td>
                                <td>{char.species}</td>
                                <td>{char.gender}</td>
                            </tr>
                        ))}
                    </tbody>
                </Table>
            )}

            <div className="character-table__pagination">
                <Button variant="secondary" onClick={() => setPage(page - 1)} disabled={page === 1}>
                    Previous
                </Button>
                <Button variant="secondary" onClick={() => setPage(page + 1)} disabled={page * itemsPerPage >= filteredCharacters.length}>
                    Next
                </Button>
            </div>
        </div>
    );
};

export default CharacterTable;
