import { model, Model, models, Schema } from 'mongoose';

abstract class AbstractODM<T> {
  private schema: Schema;
  readonly model: Model<T>;

  constructor(schema: Schema<T>, modelName: string) {
    this.schema = schema;
    this.model = models[modelName] || model(modelName, this.schema);
  }

  public async create(values: T): Promise <T> {
    return this.model.create({ ...values });
  }

  public async findAll(): Promise<T[]> {
    return this.model.find({});
  }

  public async findById(id: string): Promise<T | null> {
    return this.model.findById(id);
  }

  public async updateOne(id: string, newData: Partial<T>): Promise<T | null> {
    return this.model.findOneAndUpdate({ _id: id }, newData, { new: true });
  }

  public async deleteOne(id: string): Promise<{ deletedCount: number }> {
    return this.model.deleteOne({ _id: id });
  }
}

export default AbstractODM;