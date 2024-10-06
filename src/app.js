import express from 'express';
import path from 'path';
import { fileURLToPath } from 'url';
import { retrieveGamesByGenre } from './index.js';
import cookieParser from 'cookie-parser';
import jwt from 'jsonwebtoken'
import { retrieveGame } from './game.js';

const app = express();
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
app.use(express.static(path.join(__dirname, '..', 'public')));
app.use(cookieParser());
app.set('view engine', 'ejs');

app.set('views', path.join(__dirname, '..', 'public', 'views'));


app.get('/', checkAuth, async (req, res) => {
    const retrievedGames = await retrieveGamesByGenre('Rol');
    res.render('index', { title: 'Home', firstRow: retrievedGames.firstRow, secondRow: retrievedGames.secondRow, isLoggedIn: req.isLoggedIn });
});
app.get('/signUp', (req, res) => {
    res.render('signUp', { title: 'Registrarse' });
})
app.get('/login', (req, res) => {
    res.render('login', { title: 'Iniciar Sesion' })
})
app.get('/game/:gameName', checkAuth, async (req, res) => {
    const gameName = req.params.gameName;
    const gameData = await retrieveGame(gameName);
    const date = new Date(gameData.releaseDate);
    const options = { year: 'numeric', month: 'short', day: 'numeric' };
    const formattedDate = date.toLocaleDateString('en-US', options).toUpperCase();
    gameData.releaseDate = formattedDate;
    res.render('game', { title: gameName, gameData: gameData, isLoggedIn: req.isLoggedIn });
})
app.get('/logout', (req, res) => {
    res.clearCookie('token');
    res.redirect('/');
});
app.use((req, res) => {
    res.status(404).send('404: Page Not Found');
});

function checkAuth(req, res, next) {
    const token = req.cookies.token; // Get token from cookies

    if (!token) {
        req.isLoggedIn = false;
        return next();
    }

    jwt.verify(token, 'videogame_review_web_site', (err, decoded) => {
        if (err) {
            req.isLoggedIn = false;
        } else {
            req.isLoggedIn = true;
        }
        next();
    });
}
export default app;