async function retrieveGame(gameName){
    try{
        const response = await fetch(`http://localhost:3001/api/videogame/name/${gameName}`);
        if(!response.ok) throw new Error(response.status);
        const gameData = await response.json();
        return gameData;
    }
    catch(error){
        console.error(error.message)
    }
}
async function retrieveReviews(gameName) {
    try{
        const response = await fetch(`http://localhost:3001/api/review/videogame/name/${gameName}`);
        if(!response.ok) throw new Error(response.status);
        const reviews = await response.json();
        return reviews;
    }
    catch(error){
        console.error(error.message)
    }
}
export {
    retrieveGame,
    retrieveReviews
}