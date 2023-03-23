import { isValidObjectId } from 'mongoose';
import Car from '../Domains/Car';
import ICar from '../Interfaces/ICar';
import CarODM from '../Models/CarODM';

class CarService {
  private carODM: CarODM;

  constructor(carODM: CarODM) {
    this.carODM = carODM;
  }

  private creteCarDomain(carValues: ICar): Car {
    return new Car(carValues);
  }

  private isValidId(id: string): boolean {
    return isValidObjectId(id);
  }
  
  public async createCar(values: ICar) {
    const newCar = await this.carODM.create(values);
    return this.creteCarDomain(newCar);
  }

  public async findAllCars() {
    const allCars = await this.carODM.findAll();
    const allCarsFormated = allCars.map((car) => this.creteCarDomain(car));
    return allCarsFormated; 
  }

  public async findById(id: string) {
    if (!this.isValidId(id)) throw new Error('Invalid mongo id');

    const car = await this.carODM.findById(id);
    if (!car) throw new Error('Car not found');

    return this.creteCarDomain(car);
  }

  public async updateOne(id: string, newData: ICar) {
    if (!this.isValidId(id)) throw new Error('Invalid mongo id');
    
    const updatedCar = await this.carODM.updateOne(id, newData);
    if (!updatedCar) throw new Error('Car not found');
    return this.creteCarDomain(updatedCar);
  }
}

export default CarService;