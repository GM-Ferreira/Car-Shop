import { Router } from 'express';
import CarController from '../Controllers/CarController';
import CarService from '../Services/CarService';

const carRoutes = Router();

const carService = new CarService();
const carController = new CarController(carService);

carRoutes.post('/', (req, res, next) => carController.createCar(req, res, next));

export default carRoutes;
