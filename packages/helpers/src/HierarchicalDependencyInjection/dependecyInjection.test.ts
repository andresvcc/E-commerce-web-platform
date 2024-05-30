import { Container } from './container';
import { inject } from './inject';
import { Actor, BoundedContext, Store, Service } from './roles';

interface User {
  getData(): string;
}

interface Context {
  store: IStore;
  getData(): string;
}

interface IStore {
  data: string;
  getData(): string;
}

interface IUserService {
  analytics(): string;
}

describe('Hierarchical Dependency Injection', () => {
  it('should get a dependency using factoryFromInjectable', () => {
    @Actor({ key: 'ActActor', predicate: [] })
    class ActActor {}

    const actorInstance = Container.factoryFromInjectable<Context>('ACTOR', 'ActActor', []);
    expect(actorInstance?.constructor.name).toBe('ActActor');
  });

  it('should have 4 roles: ACTOR, BOUNDED_CONTEXT, SERVICE, and STORE', () => {
    @Actor({ key: 'ActActor', predicate: [] })
    class ActActor {}

    const allConstructorOfinjectables = Container.instantiates();
    expect(allConstructorOfinjectables).toHaveProperty('ACTOR');
    expect(allConstructorOfinjectables).toHaveProperty('BOUNDED_CONTEXT');
    expect(allConstructorOfinjectables).toHaveProperty('SERVICE');
    expect(allConstructorOfinjectables).toHaveProperty('STORE');

    expect([...allConstructorOfinjectables.ACTOR.keys()].length).toBeGreaterThan(0);
    expect([...allConstructorOfinjectables.BOUNDED_CONTEXT.keys()].length).toBeGreaterThan(0);
    expect([...allConstructorOfinjectables.SERVICE.keys()].length).toBeGreaterThan(0);
    expect([...allConstructorOfinjectables.STORE.keys()].length).toBeGreaterThan(0);
  });

  it('should instantiate a class as a singleton', () => {
    @Actor({ key: 'SingletonActor', predicate: [] })
    class SingletonActor {
      value: number = 0;
    }

    const actorInstance = Container.get('ACTOR', 'SingletonActor', []);
    const before = Container.instantiatedSingleton();
    expect([...before.ACTOR.keys()].length).toBe(1);
    expect(before.ACTOR.get('SingletonActor')).toBeDefined();
    expect(actorInstance.constructor.name).toBe('SingletonActor');

    actorInstance.value = 3;

    const actorInstance2 = Container.get('ACTOR', 'SingletonActor', []);
    const after = Container.instantiatedSingleton();
    expect([...after.ACTOR.keys()].length).toBe(1);
    expect(after.ACTOR.get('SingletonActor')).toBeDefined();
    expect(actorInstance2.constructor.name).toBe('SingletonActor');

    expect(actorInstance2.value).toBe(3);
  });
});

describe('Dependency Injection with Decorators', () => {
  @Actor({ key: 'User', predicate: [] })
  class UserActor implements User {
    context: Context;

    constructor() {
      const context = Container.factoryFromInjectable<Context>('BOUNDED_CONTEXT', 'Context', []);

      if (!context) {
        throw new Error('Context not found in container factory');
      }

      this.context = context;
    }

    getData(): string {
      return this.context.getData();
    }
  }

  @BoundedContext({ key: 'Context', predicate: [] })
  class ContextSample implements Context {
    store: IStore;
    service: IUserService;

    constructor() {
      const store = Container.factoryFromInjectable<IStore>('STORE', 'StoreSample', []);
      const service = Container.factoryFromInjectable<IUserService>('SERVICE', 'UserService', []);
      if (!store) {
        throw new Error('Store not found in container factory');
      }

      if (!service) {
        throw new Error('Service not found in container factory');
      }

      this.service = service;
      this.store = store;
    }

    getData(): string {
      return this.store?.getData();
    }

    analytics(): string {
      return this.service?.analytics();
    }
  }

  @Store({ key: 'StoreSample', predicate: [] })
  class StoreSample implements IStore {
    data = 'Ricky Bobby';

    getData(): string {
      return this.data;
    }
  }

  @Store({ key: 'StoreSample', predicate: ['testing predicated'] })
  class StoreSample2 implements IStore {
    data = 'Ricky Bobby 2';

    getData(): string {
      return this.data;
    }
  }

  @Service({ key: 'UserService', predicate: [] })
  class UserService implements IUserService {
    analytics(): string {
      return 'analytics';
    }
  }

  it('should resolve Actor dependencies using factory', () => {
    const actorInstance = Container.factoryFromInjectable<User>('ACTOR', 'User', []);
    expect(actorInstance?.constructor.name).toBe('UserActor');
  });

  it('should resolve BoundedContext dependencies using factory', () => {
    const contextIntance = Container.factoryFromInjectable<User>('BOUNDED_CONTEXT', 'Context', []);
    expect(contextIntance?.constructor.name).toBe('ContextSample');
  });

  it('should resolve Store dependencies using factory', () => {
    const storeInstance = Container.factoryFromInjectable<User>('STORE', 'StoreSample', []);
    expect(storeInstance?.constructor.name).toBe('StoreSample');
  });

  it('should resolve Service dependencies using factory', () => {
    const serviceInstance = Container.factoryFromInjectable<User>('SERVICE', 'UserService', []);
    expect(serviceInstance?.constructor.name).toBe('UserService');
  });

  it('should resolve Store predicated dependencies using factory', () => {
    const storeInstance = Container.factoryFromInjectable<User>('STORE', 'StoreSample', ['testing predicated']);
    expect(storeInstance?.constructor.name).toBe('StoreSample2');
  });

  it('should resolve dependencies using decorators', () => {
    const userManager = Container.factoryFromInjectable<User>('ACTOR', 'User', []);
    expect(userManager?.getData()).toBe('Ricky Bobby');
  });
});
