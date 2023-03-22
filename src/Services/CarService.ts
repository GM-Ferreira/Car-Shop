import Car from '../Domains/Car';
import ICar from '../Interfaces/ICar';
import CarODM from '../Models/CarODM';

class CarService {
  private creteCarDomain(carValues: ICar | null): Car | null {
    if (carValues) {
      return new Car(carValues);
    }
    return null;
  }
  
  public async createCar(values: ICar) {
    const carODM = new CarODM();
    const newCar = await carODM.createCar(values);
    return this.creteCarDomain(newCar);
  }
}

export default CarService;