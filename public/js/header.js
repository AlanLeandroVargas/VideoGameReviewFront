import { getCookie } from "./helpers.js";

let genres = [];
document.addEventListener('DOMContentLoaded', () => {
    search();
    enterGenres();
    publishVideogame();
})
function search() {
    document.getElementById('search').addEventListener('keydown', (e) => {
        if (e.key == 'Enter') {
            window.location.href = `/search?search=${e.target.value}`
        }
    })
}

function enterGenres() {
    const genreInput = document.getElementById('videogameGenre');
    const genreContainer = document.getElementById('genre-container');
    const hiddenInput = document.getElementById('genres');
    genreInput.addEventListener('keydown', function (event) {
        if (event.key === 'Enter') {
            event.preventDefault();
            const genre = genreInput.value.trim();
            if (genre && !genres.includes(genre)) {
                genres.push(genre);
                const genreTag = document.createElement('span');
                genreTag.textContent = genre;
                genreTag.className = 'genre-tag';
                genreContainer.appendChild(genreTag);
                hiddenInput.value = genres.join(',');
                genreInput.value = '';
            }
        }
    });

    genreContainer.addEventListener('click', function (event) {
        if (event.target.classList.contains('genre-tag')) {
            const genre = event.target.textContent;
            genres = genres.filter(g => g !== genre);
            event.target.remove();
            hiddenInput.value = genres.join(',');
        }
    });
}

function publishVideogame(){
    document.getElementById('publishBtn').addEventListener('click', async () => {
        try{
            const body = {};
            const videogameName = document.getElementById('videogameName').value;
            const videogameDescription = document.getElementById('videogameDescription').value;
            const videogameImageUrl = document.getElementById('videogameImageUrl').value;
            const videogameReleaseDate = document.getElementById('videogameReleaseDate').value;
            body.name = videogameName;
            body.genre = genres;
            body.description = videogameDescription;
            body.imageUrl = videogameImageUrl;
            body.releaseDate = videogameReleaseDate;
            const response = await fetch(`http://localhost:3001/api/videogame`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',           
                    'Authorization': `Bearer ${getCookie('token')}`
                },
                body: JSON.stringify(body)
            });
            if(!response.ok) throw new Error(response.status);
            window.location.reload();
        }
        catch(error){
            console.error(error);
        }
    })
}