import express from 'express';
import ErrorHandler from './Middlewares/ErrorHandler';
import carRoutes from './Routes/CarRoute';

const app = express();
app.use(express.json());
app.use('/cars', carRoutes);
app.use(ErrorHandler.handle);

export default app;
