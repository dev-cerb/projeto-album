import express from "express";

const app = express()
app.use(express.json());

const port = 8080;

app.get('/', (req, res) => {
    res.send('Hello World!');
})

app.listen(port, () => {
    console.log('Servidor rodando.')
})