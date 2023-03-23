import { expect } from 'chai';
import { Model } from 'mongoose';
import Sinon from 'sinon';
import IMotorcycle from '../../../src/Interfaces/IMotorcycle';
import MotorcycleODM from '../../../src/Models/MotorcycleODM';
import MessagesTypes from '../../../src/Services/MessagesTypes';
import MotorcycleService from '../../../src/Services/MotorcycleService';

describe('testando a camada MotorcycleService', function () {
  afterEach(function () {
    Sinon.restore();
  });

  const inputMotor: IMotorcycle = {
    model: 'Honda Cb 600f',
    year: 2005,
    color: 'Yellow',
    status: true,
    buyValue: 30.000,
    category: 'Street',
    engineCapacity: 600,  
  };

  const outputMotor: IMotorcycle = {
    id: '641ca6c0aada7daafc578872',
    model: 'Honda Cb 600f',
    year: 2005,
    color: 'Yellow',
    status: true,
    buyValue: 30.000,
    category: 'Street',
    engineCapacity: 600,  
  };

  const updatedInput: IMotorcycle = {
    model: 'Honda Cb 600f Hornet',
    year: 2014,
    color: 'Red',
    status: true,
    buyValue: 45.000,
    category: 'Street',
    engineCapacity: 600,
  };

  const updatedOutput: IMotorcycle = {
    id: '641ca6c0aada7daafc578872',
    model: 'Honda Cb 600f Hornet',
    year: 2014,
    color: 'Red',
    status: true,
    buyValue: 45.000,
    category: 'Street',
    engineCapacity: 600,
  };

  const deleteReturn = { acknowledged: true, deletedCount: 1 };
  const deleteFailReturn = { acknowledged: true, deletedCount: 0 };
  const validId = '641ca6c0aada7daafc578872';
  const invalidId = 'INVALID';

  describe('Método create', function () {
    it('Deve criar uma nova moto com sucesso', async function () {
      // arrange
      Sinon.stub(Model, 'create').resolves(outputMotor);

      // action
      const motorcycleODM = new MotorcycleODM();
      const motorcycleService = new MotorcycleService(motorcycleODM);
      const newMotorcycle = await motorcycleService.createMotorcycle(inputMotor);

      // assert
      expect(newMotorcycle).to.be.deep.equal(outputMotor);
    });
  });

  describe('Método FindAll', function () {
    it('Deve ser possível listar todos os carros', async function () {
      // Arrange
      Sinon.stub(Model, 'find').resolves([outputMotor]);
      
      // Action
      const motorcycleODM = new MotorcycleODM();
      const motorcycleService = new MotorcycleService(motorcycleODM);
      const motorList = await motorcycleService.findAllMotorcycle();
  
      // Assertion
      expect(motorList[0]).to.be.deep.equal(outputMotor);
    });
  });

  describe('Método FindById', function () {
    afterEach(function () {
      Sinon.restore();
    });
    
    it('Deve ser possível listar uma moto pelo ID', async function () {
      // Arrange
      Sinon.stub(Model, 'findById').resolves(outputMotor);
      
      // Action
      const motorcycleODM = new MotorcycleODM();
      const motorcycleService = new MotorcycleService(motorcycleODM);
      const motorcycle = await motorcycleService.findById(validId);
  
      // Assertion
      expect(motorcycle).to.be.deep.equal(outputMotor);
    });

    it('Não deve ser possível listar uma moto com ID inválido', async function () {
      // Arrange not necessary
      // Action and Assertion
      try {
        const motorcycleODM = new MotorcycleODM();
        const motorcycleService = new MotorcycleService(motorcycleODM);
        await motorcycleService.findById(invalidId);
      } catch (error) {
        expect((error as Error).message).to.be.equal('Invalid mongo id');
      }
    });

    it('Não deve ser possível listar uma moto com ID inexistente', async function () {
      // Arrange
      Sinon.stub(Model, 'findById').resolves(null);
      
      // Action and Assertion
      try {
        const motorcycleODM = new MotorcycleODM();
        const motorcycleService = new MotorcycleService(motorcycleODM);
        await motorcycleService.findById(validId);
      } catch (error) {
        expect((error as Error).message).to.be.equal('Motorcycle not found');
      }
    });
  });

  describe('Método UpdateOne', function () {
    it('Deve ser possível atualizar uma moto informando seu ID', async function () {
      // Arrange
      Sinon.stub(Model, 'findOneAndUpdate').resolves(updatedOutput);
      
      // Action
      const motorcycleODM = new MotorcycleODM();
      const motorcycleService = new MotorcycleService(motorcycleODM);
      const motor = await motorcycleService.updateOne(validId, updatedInput);
  
      // Assertion
      expect(motor).to.be.deep.equal(updatedOutput);
    });

    it('Não deve ser possível atualizar uma moto com ID inválido', async function () {
      // Arrange not necessary
      // Action and Assertion
      try {
        const motorcycleODM = new MotorcycleODM();
        const motorcycleService = new MotorcycleService(motorcycleODM);
        await motorcycleService.updateOne(invalidId, updatedInput);
      } catch (error) {
        expect((error as Error).message).to.be.equal('Invalid mongo id');
      }
    });

    it('Não deve ser possível atualizar uma moto inexistente', async function () {
      // Arrange
      Sinon.stub(Model, 'findOneAndUpdate').resolves(null);
      
      // Action and Assertion
      try {
        const motorcycleODM = new MotorcycleODM();
        const motorcycleService = new MotorcycleService(motorcycleODM);
        await motorcycleService.updateOne(validId, updatedInput);
      } catch (error) {
        expect((error as Error).message).to.be.equal('Motorcycle not found');
      }
    });
  });

  describe('Método DeleteOne', function () {
    afterEach(function () {
      Sinon.restore();
    });
    
    it('Deve ser possível deletar uma moto pelo ID', async function () {
      // Arrange
      Sinon.stub(Model, 'deleteOne').resolves(deleteReturn);
      
      // Action
      const motorcycleODM = new MotorcycleODM();
      const motorcycleService = new MotorcycleService(motorcycleODM);
      await motorcycleService.deleteOne(validId);
  
      // Assertion
      expect(motorcycleService.deleteOne).not.to.Throw();
    });

    it('Não deve ser possível deletar uma moto com ID inválido', async function () {
      // Arrange not necessary
      // Action and Assertion
      try {
        const motorcycleODM = new MotorcycleODM();
        const motorcycleService = new MotorcycleService(motorcycleODM);
        await motorcycleService.deleteOne(invalidId);
      } catch (error) {
        expect((error as Error).message).to.be.equal(MessagesTypes.INVALID);
      }
    });

    it('Não deve ser possível deletar uma moto com ID inexistente', async function () {
      // Arrange
      Sinon.stub(Model, 'deleteOne').resolves(deleteFailReturn);
      
      // Action and Assertion
      try {
        const motorcycleODM = new MotorcycleODM();
        const motorcycleService = new MotorcycleService(motorcycleODM);
        await motorcycleService.deleteOne(validId);
      } catch (error) {
        expect((error as Error).message).to.be.equal(MessagesTypes.MOTOR_NOT_FOUND);
      }
    });
  });
});