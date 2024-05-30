import { ClientProxy } from '@nestjs/microservices';
import { catchError, TimeoutError, lastValueFrom, throwError, timeout } from 'rxjs';
import { v4 as uuidv4 } from 'uuid';
import { ConfigService } from '@nestjs/config';
import { HttpException, Logger, Inject, Injectable } from '@nestjs/common';
import { MsExceptions } from './ms.exception';
import { IMSCommunication } from '../types';

type messagePattern = 'send' | 'emit';

const EMIT: messagePattern = 'emit';
const SEND: messagePattern = 'send';

export class NatsMessagePattern implements IMSCommunication {
  private readonly logger = new Logger(NatsMessagePattern.name);
  private memoryTransactions: any = {};

  constructor(private bus: ClientProxy, private config: ConfigService) {}

  private getBus(_pattern: any) {
    const bus = this.bus;
    return bus;
  }

  async send(message: string, payload: any, hideLogs = false): Promise<any> {
    try {
      const transactionId = await this.before(SEND, message, payload, hideLogs);
      const bus = this.getBus(message);

      const response = bus.send({ cmd: message }, payload).pipe(
        timeout(10000),
        catchError(async (err) => {
          await this.handleError(err, message, payload, hideLogs);

          // Verifica si el error contiene la cadena "Empty response"
          if (err.message.includes('Empty response')) {
            throw new Error(`MICROSERVICE_NOT_FOUND:No microservice responded to the message pattern ${message}`);
          } else {
            throw err; // Lanzar otros errores como excepciones normales
          }
        }),
      );

      const asyncResponse = await lastValueFrom(response);

      await this.after(SEND, transactionId, asyncResponse, hideLogs);

      return asyncResponse;
    } catch (error) {
      // Lanza la excepción para que el llamador pueda manejarla
      throw error;
    }
  }

  async emit(eventPattern: string, payload: any, hideLogs = false): Promise<void> {
    const transactionId = await this.before(EMIT, eventPattern, payload, hideLogs);
    const bus = this.getBus(eventPattern);

    await bus.emit(eventPattern, payload);
    await this.after(EMIT, transactionId);
  }

  private async before(pattern: messagePattern, message: any, payload: any, hideLogs: boolean): Promise<string> {
    const transactionId = uuidv4();

    if (!hideLogs) {
      this.logger.log(`
      transactionId:${transactionId}
      pattern: [${pattern}] --> ${message} 
      payload: ${JSON.stringify(payload)}
      `);
    }

    this.memoryTransactions[transactionId] = {
      message,
      payload,
      createdAt: Date.now(),
    };
    return transactionId;
  }

  private async after(pattern: messagePattern, transactionId: string, response?: any, hideLogs?: boolean) {
    const { message, payload, createdAt } = this.memoryTransactions[transactionId];
    const endDate = Date.now();
    const diff = endDate - createdAt;
    if (pattern === SEND && !hideLogs) {
      this.logger.log(`
    transactionId:${transactionId}
    pattern: [send] <-- ${message} (${diff} ms)
    payload: ${JSON.stringify(response)}
    hideLogs: ${hideLogs}
      `);
    }
    delete this.memoryTransactions[transactionId];
  }

  private handleError(err: any, message: string, payload: any, hideLogs: boolean) {
    const isTimeoutError = err instanceof Error;
    const tags = ['error'];

    if (isTimeoutError) {
      tags.push('timeout');
    }

    if (!hideLogs) {
      this.trace({
        name: message,
        tags,
        message: err.message,
        context: payload,
      });
    }

    return throwError(() =>
      isTimeoutError
        ? new HttpException(err.message, 408)
        : new MsExceptions(message, err.message, payload, err?.error?.response),
    );
  }

  trace(payload: any) {
    // const trace = this.config.get('trace');
    // if (!trace) {
    //   return;
    // }
    console.log('TRACE', payload);
    // this.emit('event-emitter:log', payload, true);
  }
}
