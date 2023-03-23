import { NextFunction, Request, Response } from 'express';
import ICar from '../Interfaces/ICar';
import CarService from '../Services/CarService';

class CarController {
  private service: CarService;

  constructor(service: CarService) {
    this.service = service;
  }

  public async createCar(req: Request, res: Response, next: NextFunction) {
    const car: ICar = {
      model: req.body.model,
      year: req.body.year,
      color: req.body.color,
      status: req.body.status || false,
      buyValue: req.body.buyValue,
      doorsQty: req.body.doorsQty,
      seatsQty: req.body.seatsQty,
    };

    try {
      const newCar = await this.service.createCar(car);
      return res.status(201).json(newCar);
    } catch (error) {
      next(error);
    }
  }

  public async findAllcars(_req: Request, res: Response, next: NextFunction) {
    try {
      const allCars = await this.service.findAllCars();
      return res.status(200).json(allCars);
    } catch (error) {
      next(error);
    }
  }

  public async findById(req: Request, res: Response, next: NextFunction) {
    try {
      const { id } = req.params;
      const car = await this.service.findById(id);
      return res.status(200).json(car);
    } catch (error) {
      next(error);
    }
  }

  public async updateOne(req: Request, res: Response, next: NextFunction) {
    try {
      const { id } = req.params;
      const car: ICar = {
        model: req.body.model,
        year: req.body.year,
        color: req.body.color,
        status: req.body.status || false,
        buyValue: req.body.buyValue,
        doorsQty: req.body.doorsQty,
        seatsQty: req.body.seatsQty,
      };

      const updatedCar = await this.service.updateOne(id, car);
      return res.status(200).json(updatedCar);
    } catch (error) {
      next(error);
    }
  }
}

export default CarController;