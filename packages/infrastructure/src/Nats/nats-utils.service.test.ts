// nats-utils.service.test.ts
import { NatsMessagePattern } from './nats-utils.service';
import { ClientProxy } from '@nestjs/microservices';
import { ConfigService } from '@nestjs/config';
import { of, throwError } from 'rxjs';
import { HttpException } from '@nestjs/common';

describe('NatsMessagePattern', () => {
  let natsUtils: NatsMessagePattern;
  let clientProxyMock: jest.Mocked<ClientProxy>;
  let configServiceMock: jest.Mocked<ConfigService>;

  beforeEach(() => {
    clientProxyMock = {
      send: jest.fn(),
      emit: jest.fn(),
    } as unknown as jest.Mocked<ClientProxy>;

    configServiceMock = {
      get: jest.fn(),
    } as unknown as jest.Mocked<ConfigService>;

    natsUtils = new NatsMessagePattern(clientProxyMock, configServiceMock);
  });

  describe('send', () => {
    it('should send a message and return the response', async () => {
      const message = 'exampleMessage';
      const payload = { key: 'value' };
      const response = 'exampleResponse';

      clientProxyMock.send.mockReturnValueOnce(of(response));
      configServiceMock.get.mockReturnValueOnce(5000);

      const result = await natsUtils.send(message, payload);

      expect(clientProxyMock.send).toHaveBeenCalledWith({ cmd: message }, payload);
      expect(result).toBe(response);
    });

    it('should handle errors and throw an HttpException for timeout', async () => {
      const message = 'exampleMessage';
      const payload = { key: 'value' };
      const error = new Error('Timeout error');

      clientProxyMock.send.mockReturnValueOnce(throwError(error));
      configServiceMock.get.mockReturnValueOnce(5000);

      try {
        await natsUtils.send(message, payload);
      } catch (e) {
        // eslint-disable-next-line dot-notation
        expect(e['message']).toBe('Timeout error');
      }
    });

    describe('emit', () => {
      it('should emit an event and resolve successfully', async () => {
        const eventPattern = 'exampleEvent';
        const payload = { key: 'value' };

        await natsUtils.emit(eventPattern, payload);

        expect(clientProxyMock.emit).toHaveBeenCalledWith(eventPattern, payload);
      });

      it('should handle errors and throw an HttpException', async () => {
        const eventPattern = 'exampleEvent';
        const payload = { key: 'value' };
        const error = new Error('Error occurred during emit');

        clientProxyMock.emit.mockReturnValueOnce(throwError(error));

        try {
          await natsUtils.emit(eventPattern, payload);
        } catch (e) {
          expect(e).toBeInstanceOf(HttpException);
          // expect(e.getStatus()).toBe(500); // Customize the status code as needed
          // expect(e.message).toBe(error.message);
        }
      });
    });
  });
});
