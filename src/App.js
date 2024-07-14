import React, { useState } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import CharacterTable from './components/CharacterTable';
import CharacterDetail from './components/CharacterDetail';
import './App.css';

const App = () => {
    const [selectedCharacter, setSelectedCharacter] = useState(null);

    return (
        <div className="container mt-5">
            <h1 className="text-center">Rick and Morty Characters</h1>
            <CharacterTable onCharacterSelect={setSelectedCharacter} />
            {selectedCharacter && <CharacterDetail character={selectedCharacter} />}
        </div>
    );
};

export default App;
