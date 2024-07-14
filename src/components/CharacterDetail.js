import React from 'react';
import { Card } from 'react-bootstrap';
import './CharacterDetail.css';

const CharacterDetail = ({ character }) => {
    if (!character) return null;

    return (
        <Card className="character-detail-card">
            <Card.Img variant="top" src={character.image} />
            <Card.Body>
                <Card.Title>{character.name}</Card.Title>
                <Card.Text>
                    <strong>Status:</strong> {character.status}<br />
                    <strong>Species:</strong> {character.species}<br />
                    <strong>Gender:</strong> {character.gender}<br />
                    <strong>Origin:</strong> {character.origin.name}<br />
                    <strong>Location:</strong> {character.location.name}
                </Card.Text>
            </Card.Body>
        </Card>
    );
};

export default CharacterDetail;
