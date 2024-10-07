import { getCookie } from "./helpers.js";

const bad = '#ff6874';
const decent = '#ffbd3f';
const good = '#00ce7a';
let currentRating = 0;
document.addEventListener('DOMContentLoaded', () => {
    updateReviewRating();
    publishReview();
})
function updateReviewRating() {
    const ratings = document.querySelectorAll('.rating-number');
    ratings.forEach(rating => {
        const currentRatingElement = document.querySelector('.current-rating');
        rating.addEventListener('click', () => {
            const ratingNumber = Number(rating.innerHTML);
            currentRatingElement.innerHTML = ratingNumber;
            currentRating = ratingNumber;
            if (ratingNumber < 4) {
                currentRatingElement.style.backgroundColor = bad;
            }
            if (ratingNumber >= 4 && ratingNumber < 8){
                currentRatingElement.style.backgroundColor = decent;
            }
            if (ratingNumber >= 8) {
                currentRatingElement.style.backgroundColor = good;
            }
        })
    });
}

function publishReview(){
    document.getElementById('publishBtn').addEventListener('click', async () => {
        try{
            const body = {};
            const reviewComment = document.getElementById('reviewComment').value;
            body.puntuation = currentRating;
            body.comment = reviewComment;
            body.author = getCookie('userId');
            body.videogame = document.querySelector('.card').classList[2];
            const response = await fetch(`http://localhost:3001/api/review`, {
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