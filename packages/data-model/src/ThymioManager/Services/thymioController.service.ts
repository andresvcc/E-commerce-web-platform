import { Service, Container, Store, createObservable, Observable, subscribe } from 'helpers';
import { ThymioStatus, Thymio, ThymioType, ConnectionModes, aceptedThymioTypes } from '../Model/thymio.model';

// Service Class for controller multiple thymio 2, thymio 3 or thymio extensions
@Service({ key: 'Thymio Controller', predicate: [] })
export class ThymioController {
  thymioStack: Thymio[] = [];

  // Create a new Thymio2, Thymio3 or ThymioExtension and add it to the stack
  createThymio = (type: ThymioType, uuid: string): Thymio => {
    const alreadyExist = this.findThymio(uuid);

    if (alreadyExist) {
      console.warn(`Thymio with uuid ${uuid} already exist`);
      return alreadyExist;
    }

    if (!aceptedThymioTypes.includes(type)) {
      throw new Error(`Thymio type ${type} not supported`);
    }

    const newThymio = Container.factoryFromInjectable<Thymio>('STORE', 'Thymio Store', [type], uuid);

    if (!newThymio) {
      throw new Error('Thymio not created');
    }

    this.addThymio(newThymio);
    return newThymio;
  };

  // add a thymio to the stack
  addThymio = (thymio: Thymio) => {
    this.thymioStack.push(thymio);
  };

  // remove a thymio from the stack
  removeThymio = (thymio: Thymio) => {
    this.thymioStack = this.thymioStack.filter((t) => t.uuid !== thymio.uuid);
  };

  // find a thymio in the stack by uuid
  findThymio = (uuid: string): Thymio | undefined => {
    return this.thymioStack.find((thymio) => thymio.uuid === uuid);
  };

  // subscribe to a thymio status by uuid
  subscribeToThymio = (uuid: string, fun: (args: any) => void) => {
    const thymio = this.findThymio(uuid);
    if (thymio) {
      thymio.subscribe(fun);
    }
  };

  // subscribe to all thymio status in the stack
  subscribeToAllThymio = (fun: (args: any) => void) => {
    this.thymioStack.forEach((thymio) => thymio.subscribe(fun));
  };

  // find a thymio in the stack by uuid and connect it to a mqtt broker or a websocket server
  connectThymioToSever = (type: ConnectionModes, uuid: string, host: string, token: string) => {
    const thymio = this.findThymio(uuid);
    if (thymio) {
      thymio.setConnectionMode(type, { host, token });

      switch (type) {
        case 'mqtt':
          thymio.connectToMqttBroker(host, token);
          break;
        case 'websocket':
          thymio.connectToWebsocket(host, token);
          break;
        default:
          throw new Error(`Connection mode ${type} not supported`);
      }
    }
  };

  // connect all thymio in the stack to a mqtt broker or a websocket server
  connectAllThymioToSever = (type: ConnectionModes, host: string, token: string) => {
    const AllThymioUuid = this.thymioStack.map((thymio) => thymio.uuid);
    AllThymioUuid.forEach((uuid) => this.connectThymioToSever(type, uuid, host, token));
  };
}
