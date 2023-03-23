import IMotorcycle from '../Interfaces/IMotorcycle';
import Vehicle from './Vehicle';

type Category = 'Street' | 'Custom' | 'Trail';

class Motorcycle extends Vehicle {
  private category: Category;
  private engineCapacity: number;

  constructor(motorcycle: IMotorcycle) {
    super(motorcycle);
    this.category = motorcycle.category;
    this.engineCapacity = motorcycle.engineCapacity;
  }
}

export default Motorcycle;