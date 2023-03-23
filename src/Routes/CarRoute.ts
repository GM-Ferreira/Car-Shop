import { Router } from 'express';
import CarController from '../Controllers/CarController';
import CarODM from '../Models/CarODM';
import CarService from '../Services/CarService';

const carRoutes = Router();

const carODM = new CarODM();
const carService = new CarService(carODM);
const carController = new CarController(carService);

carRoutes.post('/', (req, res, next) => carController.createCar(req, res, next));
carRoutes.get('/', (req, res, next) => carController.findAllcars(req, res, next));
carRoutes.get('/:id', (req, res, next) => carController.findById(req, res, next));

export default carRoutes;
