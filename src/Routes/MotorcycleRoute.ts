import { Router } from 'express';
import MotorcycleController from '../Controllers/MotorcycleController';
import MotorcycleODM from '../Models/MotorcycleODM';
import MotorcycleService from '../Services/MotorcycleService';

const motorcycleRoutes = Router();

const motorcycleODM = new MotorcycleODM();
const motorcycleService = new MotorcycleService(motorcycleODM);
const motorcycleController = new MotorcycleController(motorcycleService);

motorcycleRoutes.post(
  '/',
  (req, res, next) => motorcycleController.createMotorcycle(req, res, next),
);

motorcycleRoutes.get(
  '/',
  (req, res, next) => motorcycleController.findAllMotorcycles(req, res, next),
);

motorcycleRoutes.get('/:id', (req, res, next) => motorcycleController.findById(req, res, next));
motorcycleRoutes.put('/:id', (req, res, next) => motorcycleController.updateOne(req, res, next));

export default motorcycleRoutes;
