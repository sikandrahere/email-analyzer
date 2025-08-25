import Cors from 'cors';
import initMiddleware from './init-middleware.js';


const cors = initMiddleware(
  Cors({
    origin: ['http://localhost:5173', 'https://email-analyzer-five.vercel.app','https://email-analyzer-sikandraheres-projects.vercel.app/','https://email-analyzer-git-main-sikandraheres-projects.vercel.app/','https://email-analyzer-4wk2i02yv-sikandraheres-projects.vercel.app/'],
    methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
    credentials: true,
  })
);

export default cors;