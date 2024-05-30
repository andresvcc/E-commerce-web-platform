import { ThymioController } from './thymioController.service';
import { Thymio, ConnectionModes, aceptedThymioTypes, ThymioType } from '../Model/thymio.model';
import { Container } from 'helpers';
export * from '..';

const MockThymioType: { [key: string]: ThymioType } = {
  thymio2: 'thymio2',
  thymio3: 'thymio3',
};

describe('ThymioController', () => {
  let thymioController: ThymioController;

  beforeEach(() => {
    thymioController = new ThymioController();
  });

  describe('createThymio', () => {
    const FactoryMokeThymio: (uuid: string, type: ThymioType) => Thymio = (uuid: string, type: ThymioType) => {
      const thymio = Container.factoryFromInjectable<Thymio>('STORE', 'Thymio Store', [type], uuid);
      if (!thymio) {
        throw new Error(`Thymio not created from factory because of invalid Thymio type ${type}`);
      }
      return thymio;
    };

    it('should create a new Thymio and add it to the stack', () => {
      const thymioData = { uuid: '123', type: MockThymioType.thymio2 };
      const mockThymio = FactoryMokeThymio(thymioData.uuid, thymioData.type);

      const result = thymioController.createThymio(MockThymioType.thymio2, thymioData.uuid);

      expect(result.uuid).toBe(mockThymio.uuid);
      expect(thymioController.thymioStack).toContain(result);
    });
  });

  describe('addThymio', () => {
    const FactoryMokeThymio: (uuid: string, type: ThymioType) => Thymio = (uuid: string, type: ThymioType) => {
      const thymio = Container.factoryFromInjectable<Thymio>('STORE', 'Thymio Store', [type], uuid);
      if (!thymio) {
        throw new Error(`Thymio not created from factory because of invalid Thymio type ${type}`);
      }
      return thymio;
    };

    it('should add a thymio to the stack', () => {
      const thymioData = { uuid: '321', type: MockThymioType.thymio2 };
      const thymio = FactoryMokeThymio(thymioData.uuid, thymioData.type);

      thymioController.addThymio(thymio);
      expect(thymioController.thymioStack).toContain(thymio);
    });
  });

  describe('removeThymio', () => {
    it('should remove a thymio from the stack', () => {
      const FactoryMokeThymio: (uuid: string, type: ThymioType) => Thymio = (uuid: string, type: ThymioType) => {
        const thymio = Container.factoryFromInjectable<Thymio>('STORE', 'Thymio Store', [type], uuid);
        if (!thymio) {
          throw new Error(`Thymio not created from factory because of invalid Thymio type ${type}`);
        }
        return thymio;
      };

      const thymio1Data = { uuid: '123', type: MockThymioType.thymio2 };
      const thymio1 = FactoryMokeThymio(thymio1Data.uuid, thymio1Data.type);
      const thymio2Data = { uuid: '456', type: MockThymioType.thymio2 };
      const thymio2 = FactoryMokeThymio(thymio2Data.uuid, thymio2Data.type);

      thymioController.addThymio(thymio1);
      thymioController.addThymio(thymio2);

      thymioController.removeThymio(thymio1);

      expect(thymioController.thymioStack).not.toContain(thymio1);
      expect(thymioController.thymioStack).toContain(thymio2);
    });
  });

  describe('findThymio', () => {
    const FactoryMokeThymio: (uuid: string, type: ThymioType) => Thymio = (uuid: string, type: ThymioType) => {
      const thymio = Container.factoryFromInjectable<Thymio>('STORE', 'Thymio Store', [type], uuid);
      if (!thymio) {
        throw new Error(`Thymio not created from factory because of invalid Thymio type ${type}`);
      }
      return thymio;
    };

    it('should find a thymio in the stack by uuid', () => {
      const thymio1Data = { uuid: '123', type: MockThymioType.thymio2 };
      const thymio1 = FactoryMokeThymio(thymio1Data.uuid, thymio1Data.type);
      const thymio2Data = { uuid: '456', type: MockThymioType.thymio2 };
      const thymio2 = FactoryMokeThymio(thymio2Data.uuid, thymio2Data.type);

      thymioController.addThymio(thymio1);
      thymioController.addThymio(thymio2);

      const result = thymioController.findThymio('456');

      expect(result).toBe(thymio2);
    });

    it('should return undefined if thymio is not found', () => {
      const result = thymioController.findThymio('123');

      expect(result).toBeUndefined();
    });
  });

  describe('subscribeToThymio', () => {
    const FactoryMokeThymio: (uuid: string, type: ThymioType) => Thymio = (uuid: string, type: ThymioType) => {
      const thymio = Container.factoryFromInjectable<Thymio>('STORE', 'Thymio Store', [type], uuid);
      if (!thymio) {
        throw new Error(`Thymio not created from factory because of invalid Thymio type ${type}`);
      }
      return thymio;
    };

    it('should subscribe to a thymio status by uuid', () => {
      const thymioData = { uuid: '123', type: MockThymioType.thymio2 };
      const thymio = FactoryMokeThymio(thymioData.uuid, thymioData.type);
      thymio.subscribe = jest.fn();
      const mockFindThymio = jest.fn(() => thymio);

      thymioController.findThymio = mockFindThymio;

      thymioController.subscribeToThymio('123', jest.fn());

      expect(thymio.subscribe).toHaveBeenCalled();
      expect(mockFindThymio).toHaveBeenCalledWith('123');
    });

    it('should not subscribe if thymio is not found', () => {
      const mockFindThymio = jest.fn(() => undefined);
      thymioController.findThymio = mockFindThymio;

      thymioController.subscribeToThymio('123', jest.fn());

      expect(mockFindThymio).toHaveBeenCalledWith('123');
    });
  });

  describe('subscribeToAllThymio', () => {
    const FactoryMokeThymio: (uuid: string, type: ThymioType) => Thymio = (uuid: string, type: ThymioType) => {
      const thymio = Container.factoryFromInjectable<Thymio>('STORE', 'Thymio Store', [type], uuid);
      if (!thymio) {
        throw new Error(`Thymio not created from factory because of invalid Thymio type ${type}`);
      }
      return thymio;
    };

    it('should subscribe to all thymio status in the stack', () => {
      const callback = jest.fn();

      const thymio1Data = { uuid: '123', type: MockThymioType.thymio2 };
      const thymio1 = FactoryMokeThymio(thymio1Data.uuid, thymio1Data.type);
      thymio1.subscribe = callback;
      const thymio2Data = { uuid: '456', type: MockThymioType.thymio2 };
      const thymio2 = FactoryMokeThymio(thymio2Data.uuid, thymio2Data.type);
      thymio2.subscribe = callback;

      thymioController.addThymio(thymio1);
      thymioController.addThymio(thymio2);

      thymioController.subscribeToAllThymio(callback);

      expect(thymio1.subscribe).toHaveBeenCalledWith(callback);
      expect(thymio2.subscribe).toHaveBeenCalledWith(callback);
    });
  });

  describe('connectThymioToSever', () => {
    const FactoryMokeThymio: (uuid: string, type: ThymioType) => Thymio = (uuid: string, type: ThymioType) => {
      const thymio = Container.factoryFromInjectable<Thymio>('STORE', 'Thymio Store', [type], uuid);
      if (!thymio) {
        throw new Error(`Thymio not created from factory because of invalid Thymio type ${type}`);
      }
      return thymio;
    };

    it('should connect a thymio to a server and set connection mode', () => {
      const thymioData = { uuid: '123', type: MockThymioType.thymio2 };
      const thymio = FactoryMokeThymio(thymioData.uuid, thymioData.type);
      thymio.setConnectionMode = jest.fn();
      thymio.connectToMqttBroker = jest.fn();
      thymio.connectToMqttBroker = jest.fn();

      const mockFindThymio = jest.fn(() => thymio);
      thymioController.findThymio = mockFindThymio;

      thymioController.connectThymioToSever('mqtt', '123', 'localhost', 'token');

      expect(thymio.setConnectionMode).toHaveBeenCalledWith('mqtt', { host: 'localhost', token: 'token' });
      expect(thymio.connectToMqttBroker).toHaveBeenCalledWith('localhost', 'token');
      expect(mockFindThymio).toHaveBeenCalledWith('123');
    });

    it('should not connect if thymio is not found', () => {
      const mockFindThymio = jest.fn(() => undefined);
      thymioController.findThymio = mockFindThymio;

      thymioController.connectThymioToSever('mqtt', '123', 'localhost', 'token');

      expect(mockFindThymio).toHaveBeenCalledWith('123');
    });
  });

  describe('connectAllThymioToSever', () => {
    const FactoryMokeThymio: (uuid: string, type: ThymioType) => Thymio = (uuid: string, type: ThymioType) => {
      const thymio = Container.factoryFromInjectable<Thymio>('STORE', 'Thymio Store', [type], uuid);
      if (!thymio) {
        throw new Error(`Thymio not created from factory because of invalid Thymio type ${type}`);
      }
      return thymio;
    };

    it('should connect all thymio in the stack to a server', () => {
      const thymio1Data = { uuid: '123', type: MockThymioType.thymio2 };
      const thymio1 = FactoryMokeThymio(thymio1Data.uuid, thymio1Data.type);
      const thymio2Data = { uuid: '456', type: MockThymioType.thymio2 };
      const thymio2 = FactoryMokeThymio(thymio2Data.uuid, thymio2Data.type);

      thymioController.addThymio(thymio1);
      thymioController.addThymio(thymio2);

      const mockConnectThymioToSever = jest.spyOn(thymioController, 'connectThymioToSever');
      thymioController.connectAllThymioToSever('mqtt', 'localhost', 'token');

      expect(mockConnectThymioToSever).toHaveBeenCalledWith('mqtt', '123', 'localhost', 'token');
      expect(mockConnectThymioToSever).toHaveBeenCalledWith('mqtt', '456', 'localhost', 'token');
    });
  });
});
