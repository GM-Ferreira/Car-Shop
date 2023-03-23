import { isValidObjectId } from 'mongoose';
import Motorcycle from '../Domains/Motorcycle';
import IMotorcycle from '../Interfaces/IMotorcycle';
import MotorcycleODM from '../Models/MotorcycleODM';

class MotorcycleService {
  private motorcycleODM: MotorcycleODM;

  constructor(motorcycleODM: MotorcycleODM) {
    this.motorcycleODM = motorcycleODM;
  }

  private creteMotorcycleDomain(motorcycleValues: IMotorcycle): Motorcycle {
    return new Motorcycle(motorcycleValues);
  }

  private isValidId(id: string): boolean {
    return isValidObjectId(id);
  }
  
  public async createMotorcycle(values: IMotorcycle) {
    const newCar = await this.motorcycleODM.create(values);
    return this.creteMotorcycleDomain(newCar);
  }

  public async findAllMotorcycle() {
    const allMotorcycles = await this.motorcycleODM.findAll();
    const allMotorcyclesFormated = allMotorcycles.map((bike) => this.creteMotorcycleDomain(bike));
    return allMotorcyclesFormated; 
  }

  public async findById(id: string) {
    if (!this.isValidId(id)) throw new Error('Invalid mongo id');

    const motorcycle = await this.motorcycleODM.findById(id);
    if (!motorcycle) throw new Error('Motorcycle not found');

    return this.creteMotorcycleDomain(motorcycle);
  }

  public async updateOne(id: string, newData: IMotorcycle) {
    if (!this.isValidId(id)) throw new Error('Invalid mongo id');
    
    const updatedMotorcycle = await this.motorcycleODM.updateOne(id, newData);
    if (!updatedMotorcycle) throw new Error('Motorcycle not found');
    return this.creteMotorcycleDomain(updatedMotorcycle);
  }
}

export default MotorcycleService;