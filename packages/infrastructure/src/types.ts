export interface IMSCommunication {
  send(message: string, payload: any, hideLogs?: boolean): Promise<any>;
  emit(eventPattern: string, payload: any, hideLogs?: boolean): Promise<void>;
  trace(payload: any): void;
}

export interface ICheckService {
  checkMicroservice(name: string): Promise<void>;
}
