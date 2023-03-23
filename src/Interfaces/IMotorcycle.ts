import IVehicle from './IVehicle';

type Category = 'Street' | 'Custom' | 'Trail';

interface IMotorcycle extends IVehicle{
  id?: string;
  category: Category;
  engineCapacity: number;
}

export default IMotorcycle;