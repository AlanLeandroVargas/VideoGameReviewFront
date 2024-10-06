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
export {
    retrieveGame
}