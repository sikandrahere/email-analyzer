import Cors from 'cors';
import initMiddleware from './init-middleware.js';


const cors = initMiddleware(
  Cors({
    origin: ['http://localhost:5173', 'https://your-frontend-domain.com'],
    methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
    credentials: true,
  })
);

export default cors;