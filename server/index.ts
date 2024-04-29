import express, { Request, Response } from 'express'
import cors from 'cors'

// Routes

import analyzeRouter from './routes/analyze';
import startStockfish from './routes/startStockfish';
import avaibleMoves from './routes/boardController';

const PORT = process.env.PORT || 4000
// Host do servidor
const HOSTNAME = process.env.HOSTNAME || 'http://localhost'
// App Express
const app = express();

app.use(cors({
    origin: "http://localhost:3000"
}))

app.use(express.json());


//Router
app.use('/api', analyzeRouter);
app.use('/api', startStockfish);
app.use('/api', avaibleMoves);

// Endpoint raiz
app.get('/', (request: Request, response: Response) => {
    response.status(200) 
});

// Cors
app.use(cors({
    origin: ['http://localhost:3000']
}))
// Resposta padrão para quaisquer outras requisições:
app.use((request: Request, response: Response) => {
    response.status(404)
})
// Inicia o sevidor
app.listen(PORT, () => {
    console.log(`Servidor rodando com sucesso ${HOSTNAME}:${PORT}`)
})

// Routes


