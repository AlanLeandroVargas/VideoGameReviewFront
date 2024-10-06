import express from 'express';
import path from 'path';
import { fileURLToPath } from 'url';
import { retrieveGamesByGenre } from './index.js';

const app = express();
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
app.use(express.static(path.join(__dirname, '..', 'public')));

app.set('view engine', 'ejs');

app.set('views', path.join(__dirname, '..', 'public', 'views'));


app.get('/', async (req, res) => {
    const retrievedGames = await retrieveGamesByGenre('Rol');
    res.render('index', { title: 'Home', firstRow: retrievedGames.firstRow, secondRow: retrievedGames.secondRow });
});
app.get('/signUp', (req, res) => {
    res.render('signUp', { title: 'Registrarse' });
})
app.get('/login', (req, res) => {
    res.render('login', { title: 'Iniciar Sesion' })
})
app.get('/game/:gameName', async (req, res) => {
    const gameName = req.params.gameName;    
    res.render('game', { title: gameName });
})
app.use((req, res) => {
    res.status(404).send('404: Page Not Found');
});
export default app;