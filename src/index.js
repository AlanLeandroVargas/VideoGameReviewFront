async function retrieveGamesByGenre(genre)
{
    try{
        const response = await fetch(`http://localhost:3001/api/videogame/genre/${genre}`);
        if(!response.ok){
            throw new Error(response.status);
        }
        const videogames = await response.json();
        const rows = {
            firstRow: videogames.slice(0, 4),
            secondRow: videogames.slice(4, 8),
        }
        return rows;
    }
    catch(error){
        console.error(error.message);
    }
}

export {
    retrieveGamesByGenre
}