import { model, Model, models, Schema } from 'mongoose';
import ICar from '../Interfaces/ICar';

class CarODM {
  private schema: Schema;
  private model: Model<ICar>;

  constructor() {
    this.schema = new Schema<ICar>({
      model: { type: String, required: true },
      year: { type: Number, required: true },
      color: { type: String, required: true },
      status: { type: Boolean, required: true },
      buyValue: { type: Number, required: true },
      doorsQty: { type: Number, required: true },
      seatsQty: { type: Number, required: true },
    });
    this.model = models.Car || model('Car', this.schema);
  }

  public async createCar(values: ICar): Promise <ICar> {
    return this.model.create({ ...values });
  }

  public async findAllCars(): Promise<ICar[]> {
    return this.model.find({});
  }

  public async findById(id: string): Promise<ICar | null> {
    return this.model.findById(id);
  }

  public async updateOne(id: string, newData: ICar): Promise<ICar | null> {
    return this.model.findOneAndUpdate({ _id: id }, newData, { new: true });
  }
}

export default CarODM;