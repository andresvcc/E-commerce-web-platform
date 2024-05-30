import { Store, createObservable, Observable, subscribe } from 'helpers';
import {
  ThymioStatus,
  Thymio,
  ThymioType,
  ThymioPorts,
  ConnectionModes,
  ConnectionParams,
} from '../Model/thymio.model';

// store class for ThymioExtension of type Thymio
@Store({ key: 'Thymio Store', predicate: ['thymioExtension'] })
export class ThymioExtension implements Thymio {
  // uuid of the thymio (unique identifier)
  uuid: string;
  type: ThymioType = 'thymioExtension';

  // Observable of the status of the thymio (activity, stack, updateAt)
  readonly status: Observable<ThymioStatus> = createObservable({
    key: 'Thymio Status',
    initialValue: {
      updateAt: new Date(),
      activity: 'initialising',
      stack: [],
    },
  });

  // Observable of the connection modes of the thymio (usb, dongle, bluetooth, mqtt, websocket)
  readonly connectionModes: Observable<ThymioPorts> = createObservable({
    key: 'Thymio Connection Modes',
    initialValue: {
      usb: {},
      dongle: {},
      bluetooth: {},
      mqtt: {},
      websocket: {},
    },
  });

  constructor(uuid: string) {
    this.uuid = uuid;
  }

  // set a new mode of connection for the thymio or update the parameters of an existing mode of connection
  setConnectionMode = (mode: ConnectionModes, params: ConnectionParams) => {
    const nextState: ThymioPorts = { ...this.connectionModes.state, [mode]: params };
    this.connectionModes.set(nextState);
  };

  // get the current mode of connection for the thymio
  getConnectionModes = (): ThymioPorts => {
    return this.connectionModes.state;
  };

  // connect the thymio to the mqtt broker
  connectToMqttBroker = (host: string, token: string) => {
    console.log('connectToMqttBroker on thymioExtension', host, token);
  };

  // connect the thymio to the websocket server
  connectToWebsocket = (host: string, token: string) => {
    console.log('connectToWebsocket on thymioExtension', host, token);
  };

  // subscribe to the status of the thymio (activity, stack, updateAt)
  subscribe = (fun: (args: any) => void) => {
    const references = {
      state: this.status.state,
    };

    subscribe(this.status, () => fun(references));
  };

  // send a message to the thymio for the execution of a code (Micropython or Aseba) and save this code in the stack of the thymio
  execute = (code: any) => {
    console.log('execute', code);
    this.status.set({ activity: 'executing', stack: [...this.status.state.stack, code], updateAt: new Date() });
  };

  // stop the execution of the code on the thymio
  stop = () => {
    this.status.set({ activity: 'stoped', stack: this.status.state.stack, updateAt: new Date() });
  };

  // clear the stack of the thymio
  clearStack = () => {
    this.status.set({ activity: 'stoped', stack: [], updateAt: new Date() });
  };
}
