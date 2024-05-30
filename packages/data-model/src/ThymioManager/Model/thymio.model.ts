import { Code } from '../../ScriptManager/types';
import { Observable } from 'helpers';

/**
 * @types
 */

// thymio types
export type ThymioType = 'thymio2' | 'thymio3' | 'thymioExtension';

// connection modes
export type Wifi = 'mqtt' | 'websocket';
export type Bluetooth = 'bluetooth';
export type Usb = 'usb';
export type Dongle = 'dongle';
export type ConnectionModes = Wifi | Bluetooth | Usb | Dongle;

export type ConnectionParams = {
  topic?: string;
  host?: string;
  token?: string;
  path?: string;
  address?: string;
  channel?: string;
};

export type ThymioPorts = {
  [key in ConnectionModes]?: ConnectionParams;
};

type Activity = 'executing' | 'updating' | 'sending' | 'receiving' | 'stoped' | 'initialising';

// status
export type ThymioStatus = {
  updateAt: Date;
  activity: Activity;
  stack: Code[];
};

/**
 * @interfaces
 */

export interface Thymio {
  uuid: string;
  type: ThymioType;
  status: Observable<ThymioStatus>;
  connectionModes: Observable<ThymioPorts>;
  subscribe: (args: any) => void;
  execute: (code: Code) => void;
  stop: () => void;
  clearStack: () => void;
  setConnectionMode: (mode: ConnectionModes, params: ConnectionParams) => void;
  getConnectionModes: () => ThymioPorts;
  connectToMqttBroker: (host: string, token: string) => void;
  connectToWebsocket: (host: string, token: string) => void;
}

/**
 * @constants
 */

export const aceptedThymioTypes: ThymioType[] = ['thymio2', 'thymio3', 'thymioExtension'];
export const acceptedThymioConnectionModes: ConnectionModes[] = ['usb', 'dongle', 'mqtt', 'bluetooth', 'websocket'];
