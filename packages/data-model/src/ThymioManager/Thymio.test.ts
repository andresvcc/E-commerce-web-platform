import { describe, expect, test } from '@jest/globals';
import { Container } from 'helpers';
import { Thymio, ThymioController } from '.';
export * from '.';

describe('Injection Thymio entity', () => {
  test('Thymio2 [Store]', () => {
    const thymio = Container.factoryFromInjectable<Thymio>('STORE', 'Thymio Store', ['thymio2'], '1234');
    expect(thymio?.uuid).toBe('1234');
    expect(thymio?.type).toBe('thymio2');
  });

  test('Thymio3 [Store]', () => {
    const thymio = Container.factoryFromInjectable<Thymio>('STORE', 'Thymio Store', ['thymio3'], '1234');
    expect(thymio?.uuid).toBe('1234');
    expect(thymio?.type).toBe('thymio3');
  });

  test('thymioExtension [Store]', () => {
    const thymio = Container.factoryFromInjectable<Thymio>('STORE', 'Thymio Store', ['thymioExtension'], '1234');
    expect(thymio?.uuid).toBe('1234');
    expect(thymio?.type).toBe('thymioExtension');
  });

  test('Thymio Controller [Service]', () => {
    const injectables = Container.injectables;
    const thymioController = Container.factoryFromInjectable<ThymioController>('SERVICE', 'Thymio Controller', [], {});
    thymioController?.createThymio('thymio2', '1234');
    const thymio1234 = thymioController?.findThymio('1234');
    expect(thymio1234?.uuid).toBe('1234');
    expect(thymio1234?.type).toBe('thymio2');
  });
});
