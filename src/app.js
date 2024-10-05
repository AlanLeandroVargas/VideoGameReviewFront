import express from 'express';
import path from 'path';
import { fileURLToPath } from 'url';

const app = express();
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
app.use(express.static(path.join(__dirname, '..', 'public')));

app.set('view engine', 'ejs');

app.set('views', path.join(__dirname, '..', 'public', 'views'));


app.get('/', (req, res) => {
    res.render('index', { title: 'Home' }); 
});
app.get('/signUp', (req, res) => {
    res.render('signUp', { title: 'Sign up'});
})

app.use((req, res) => {
    res.status(404).send('404: Page Not Found');
});
export default app;