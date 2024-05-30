import { Actor, BoundedContext, Service, Store, createObservable, Observable, subscribe, inject } from 'helpers';

import type { Code, Script } from './types';

@Store({ key: 'Script', predicate: ['AsebaScript'] })
export class AsebaScript implements Script {
  readonly code: Observable<Code> = createObservable({
    key: 'asebaCode',
    initialValue: {
      value: '',
    },
  });

  history: Code[] = [];

  onChange = (fun: (args: any) => void) => {
    const references = {
      code: this.code.state,
    };

    subscribe(this.code, () => fun(references));
  };

  send = (code: Code) => {
    this.history.push(code);
  };
}

@Store({ key: 'Script', predicate: ['MicropythonScript'] })
export class MicropythonScript implements Script {
  readonly code: Observable<Code> = createObservable({
    key: 'micropythonCode',
    initialValue: {
      value: '',
    },
  });

  history: Code[] = [];

  onChange = (fun: (args: any) => void) => {
    const references = {
      code: this.code.state,
    };

    subscribe(this.code, () => fun(references));
  };

  send = (code: Code) => {
    this.history.push(code);
  };
}
