import axios from 'axios';

export const getAllCharacters = async () => {
    const allCharacters = [];
    let page = 1;
    let hasMore = true;

    while (hasMore) {
        try {
            const response = await axios.get(`https://rickandmortyapi.com/api/character?page=${page}`);
            allCharacters.push(...response.data.results);
            page++;
            hasMore = response.data.info.next !== null;
        } catch (error) {
            throw error;
        }
    }

    return allCharacters;
};
