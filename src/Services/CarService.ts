import { isValidObjectId } from 'mongoose';
import Car from '../Domains/Car';
import ICar from '../Interfaces/ICar';
import CarODM from '../Models/CarODM';

class CarService {
  private carODM: CarODM;

  constructor(carODM: CarODM) {
    this.carODM = carODM;
  }

  private creteCarDomain(carValues: ICar | null): Car | null {
    if (carValues) {
      return new Car(carValues);
    }
    return null;
  }
  
  public async createCar(values: ICar) {
    const newCar = await this.carODM.createCar(values);
    return this.creteCarDomain(newCar);
  }

  public async findAllCars() {
    const allCars = await this.carODM.findAllCars();
    const allCarsFormated = allCars.map((car) => this.creteCarDomain(car));
    return allCarsFormated; 
  }

  public async findById(id: string) {
    const isValid = isValidObjectId(id);
    if (!isValid) throw new Error('Invalid mongo id');

    const car = await this.carODM.findById(id);
    if (!car) throw new Error('Car not found');

    return this.creteCarDomain(car);
  }
}

export default CarService;