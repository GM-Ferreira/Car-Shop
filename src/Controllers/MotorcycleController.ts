import { NextFunction, Request, Response } from 'express';
import IMotorcycle from '../Interfaces/IMotorcycle';
import MotorcycleService from '../Services/MotorcycleService';

class MotorcycleController {
  private service: MotorcycleService;

  constructor(service: MotorcycleService) {
    this.service = service;
  }

  public async createMotorcycle(req: Request, res: Response, next: NextFunction) {
    const motorcycle: IMotorcycle = {
      model: req.body.model,
      year: req.body.year,
      color: req.body.color,
      status: req.body.status || false,
      buyValue: req.body.buyValue,
      category: req.body.category,
      engineCapacity: req.body.engineCapacity,
    };

    try {
      const newMotorcycle = await this.service.createMotorcycle(motorcycle);
      return res.status(201).json(newMotorcycle);
    } catch (error) {
      next(error);
    }
  }

  public async findAllMotorcycles(_req: Request, res: Response, next: NextFunction) {
    try {
      const allMotorcycles = await this.service.findAllMotorcycle();
      return res.status(200).json(allMotorcycles);
    } catch (error) {
      next(error);
    }
  }

  public async findById(req: Request, res: Response, next: NextFunction) {
    try {
      const { id } = req.params;
      const motorcycle = await this.service.findById(id);
      return res.status(200).json(motorcycle);
    } catch (error) {
      next(error);
    }
  }

  public async updateOne(req: Request, res: Response, next: NextFunction) {
    try {
      const { id } = req.params;
      const motorcycle: IMotorcycle = {
        model: req.body.model,
        year: req.body.year,
        color: req.body.color,
        status: req.body.status || false,
        buyValue: req.body.buyValue,
        category: req.body.category,
        engineCapacity: req.body.engineCapacity,
      };

      const updatedMotorcycle = await this.service.updateOne(id, motorcycle);
      return res.status(200).json(updatedMotorcycle);
    } catch (error) {
      next(error);
    }
  }
}

export default MotorcycleController;