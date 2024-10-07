async function searchGames(search){
    try{
        const response = await fetch(`http://localhost:3001/api/videogame/search?search=${search}`);
        if(!response.ok) throw new Error(response.status);
        const retrievedGames = await response.json();
        return retrievedGames;
    }
    catch(error){
        console.error(error)
    }
}
export {
    searchGames
}