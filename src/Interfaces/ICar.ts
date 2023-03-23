import IVehicle from './IVehicle';

interface ICar extends IVehicle{
  id?: string;
  doorsQty: number;
  seatsQty: number;
}

export default ICar;