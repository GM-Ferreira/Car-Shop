import { expect } from 'chai';
import { Model } from 'mongoose';
import Sinon from 'sinon';
import ICar from '../../../src/Interfaces/ICar';
import CarODM from '../../../src/Models/CarODM';
import CarService from '../../../src/Services/CarService';
import MessagesTypes from '../../../src/Services/MessagesTypes';

describe('Testando a camada CarService', function () {
  afterEach(function () {
    Sinon.restore();
  });

  const inputCar: ICar = {
    model: 'Marea',
    year: 2002,
    color: 'Black',
    status: true,
    buyValue: 15.990,
    doorsQty: 4,
    seatsQty: 5,
  };

  const outputCar: ICar = {
    id: '641c7ffc4245648eb3328100',
    model: 'Marea',
    year: 2002,
    color: 'Black',
    status: true,
    buyValue: 15.99,
    doorsQty: 4,
    seatsQty: 5,
  };

  const outputUpdatedCar: ICar = {
    id: '641c7ffc4245648eb3328100',
    model: 'C63 AMG',
    year: 2018,
    color: 'Black',
    status: true,
    buyValue: 549.900,
    doorsQty: 4,
    seatsQty: 5,
  };

  const updateInput: ICar = {
    model: 'C63 AMG',
    year: 2018,
    color: 'Black',
    status: true,
    buyValue: 549.900,
    doorsQty: 4,
    seatsQty: 5,
  };

  const deleteReturn = { acknowledged: true, deletedCount: 1 };
  const deleteFailReturn = { acknowledged: true, deletedCount: 0 };
  const validId = '641c7ffc4245648eb3328100';
  const invalidId = 'invalid';

  describe('Método Create', function () {
    it('Deve ser possível criar um novo carro', async function () {
      // Arrange
      Sinon.stub(Model, 'create').resolves(outputCar);
      
      // Action
      const carODM = new CarODM();
      const carService = new CarService(carODM);
      const newCar = await carService.createCar(inputCar);
  
      // Assertion
      expect(newCar).to.be.deep.equal(outputCar);
    });
  });

  describe('Método FindAll', function () {
    it('Deve ser possível listar todos os carros', async function () {
      // Arrange
      Sinon.stub(Model, 'find').resolves([outputCar]);
      
      // Action
      const carODM = new CarODM();
      const carService = new CarService(carODM);
      const carsList = await carService.findAllCars();
  
      // Assertion
      expect(carsList[0]).to.be.deep.equal(outputCar);
    });
  });

  describe('Método FindById', function () {
    afterEach(function () {
      Sinon.restore();
    });
    
    it('Deve ser possível listar um carro pelo ID', async function () {
      // Arrange
      Sinon.stub(Model, 'findById').resolves(outputCar);
      
      // Action
      const carODM = new CarODM();
      const carService = new CarService(carODM);
      const car = await carService.findById('641c7ffc4245648eb3328100');
  
      // Assertion
      expect(car).to.be.deep.equal(outputCar);
    });

    it('Não deve ser possível listar um carro com ID inválido', async function () {
      // Arrange not necessary
      // Action and Assertion
      try {
        const carODM = new CarODM();
        const carService = new CarService(carODM);
        await carService.findById(invalidId);
      } catch (error) {
        expect((error as Error).message).to.be.equal('Invalid mongo id');
      }
    });

    it('Não deve ser possível listar um carro com ID inexistente', async function () {
      // Arrange
      Sinon.stub(Model, 'findById').resolves(null);
      
      // Action and Assertion
      try {
        const carODM = new CarODM();
        const carService = new CarService(carODM);
        await carService.findById(validId);
      } catch (error) {
        expect((error as Error).message).to.be.equal('Car not found');
      }
    });
  });

  describe('Método UpdateOne', function () {
    it('Deve ser possível atualizar um carro informando seu ID', async function () {
      // Arrange
      Sinon.stub(Model, 'findOneAndUpdate').resolves(outputUpdatedCar);
      
      // Action
      const carODM = new CarODM();
      const carService = new CarService(carODM);
      const car = await carService.updateOne('641c7ffc4245648eb3328100', updateInput);
  
      // Assertion
      expect(car).to.be.deep.equal(outputUpdatedCar);
    });

    it('Não deve ser possível atualizar um carro com ID inválido', async function () {
      // Arrange not necessary
      // Action and Assertion
      try {
        const carODM = new CarODM();
        const carService = new CarService(carODM);
        await carService.updateOne(invalidId, updateInput);
      } catch (error) {
        expect((error as Error).message).to.be.equal('Invalid mongo id');
      }
    });

    it('Não deve ser possível atualizar um carro inexistente', async function () {
      // Arrange
      Sinon.stub(Model, 'findOneAndUpdate').resolves(null);
      
      // Action and Assertion
      try {
        const carODM = new CarODM();
        const carService = new CarService(carODM);
        await carService.updateOne('641c7ffc4245648eb3328100', updateInput);
      } catch (error) {
        expect((error as Error).message).to.be.equal('Car not found');
      }
    });
  });

  describe('Método DeleteOne', function () {
    afterEach(function () {
      Sinon.restore();
    });
    
    it('Deve ser possível deletar um carro pelo ID', async function () {
      // Arrange
      Sinon.stub(Model, 'deleteOne').resolves(deleteReturn);
      
      // Action
      const carODM = new CarODM();
      const carService = new CarService(carODM);
      await carService.deleteOne(validId);
  
      // Assertion
      expect(carService.deleteOne).not.to.Throw();
    });

    it('Não deve ser possível deletar um carro com ID inválido', async function () {
      // Arrange not necessary
      // Action and Assertion
      try {
        const carODM = new CarODM();
        const carService = new CarService(carODM);
        await carService.deleteOne(invalidId);
      } catch (error) {
        expect((error as Error).message).to.be.equal(MessagesTypes.INVALID);
      }
    });

    it('Não deve ser possível deletar um carro com ID inexistente', async function () {
      // Arrange
      Sinon.stub(Model, 'deleteOne').resolves(deleteFailReturn);
      
      // Action and Assertion
      try {
        const carODM = new CarODM();
        const carService = new CarService(carODM);
        await carService.deleteOne(validId);
      } catch (error) {
        expect((error as Error).message).to.be.equal(MessagesTypes.CAR_NOT_FOUND);
      }
    });
  });
});