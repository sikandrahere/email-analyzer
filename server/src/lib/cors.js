import Cors from 'cors';
import initMiddleware from './init-middleware.js';


const cors = initMiddleware(
  Cors({
    origin: ['http://localhost:5173', 'https://email-analyzer-five.vercel.app'],
    methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
    credentials: true,
  })
);

export default cors;
