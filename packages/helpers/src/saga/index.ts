export type Context = Record<string, any>;
export type Invoke = (context: any) => Promise<any>;

export type Conpensation = ((ctx: Context, errors: string[], history: any[]) => void | Promise<void>) | null;

export type InvokeAction = {
  name: string;
  condition?: ((ctx: Context) => boolean) | null;
  action: (ctx: Context) => Context | Promise<Context>;
  compensation?: Conpensation;
  skipRollback?: boolean;
};

export type Verify = {
  label: string;
  fn: (ctx: Context) => boolean;
  generalMessage?: string;
};

export type Condition = (ctx: Context) => boolean;

export type SagaStep = {
  name: string;
  condition?: Condition[];
  invokes: InvokeAction[];
  compensation?: Conpensation;
  verify?: Verify[];
  skipRollback?: boolean;
};

type Workflow = SagaStep[];

export type SagaResponse<T extends Context> = {
  state: 'success' | 'failed';
  context: T;
  errors: string[];
  history: any[];
};

export type SagaError = string;

export class SagaProcessor<T extends Context> {
  private steps: Workflow = [];
  private history: any[] = [];
  private ctx: T;
  private toCompensate: Array<Conpensation> = [];
  private errors: SagaError[] = [];
  private invokedSteps: number[] = [];
  private compensatedSteps: number[] = []; // Nueva propiedad para registrar pasos compensados

  constructor(ctx: T) {
    this.ctx = ctx;
  }

  add(workflow: Workflow): SagaProcessor<T> {
    this.steps.push(...workflow);
    return this;
  }

  async start(): Promise<SagaResponse<T>> {
    for (let i = 0; i < this.steps.length; i++) {
      const step = this.steps[i];

      if (step.condition) {
        const conditionsResults = step.condition.map((condition) => condition(this.ctx));
        if (!conditionsResults.every((result) => !!result)) {
          continue;
        }
      }

      if (!(await this.executeStep(step, i))) {
        return this.formatResponse();
      }

      // Verificación
      if (step.verify) {
        for (const verification of step.verify) {
          const result = await verification.fn(this.ctx);
          if (!result) {
            const next = await this.handleVerificationFailure(step, i, verification.label, verification.generalMessage);
            if (!next) {
              return this.formatResponse();
            }
          }
        }
      }
    }

    return this.formatResponse();
  }

  private async executeStep(step: SagaStep, stepIndex: number): Promise<boolean> {
    for (const invoke of step.invokes) {
      if (invoke.condition && !invoke.condition(this.ctx)) {
        continue;
      }

      if (invoke.compensation) {
        this.toCompensate.push(invoke.compensation);
      }

      try {
        const response = await invoke.action(this.ctx);
        this.ctx = { ...this.ctx, ...response };
      } catch (err: any) {
        if (!(await this.handleInvokeActionError(err.message, step, stepIndex))) {
          return false; // If rollback happens and we shouldn't continue further
        }
      }

      this.invokedSteps.push(stepIndex);
    }

    if (step.compensation) {
      this.toCompensate.push(step.compensation);
    }

    return true;
  }

  private async handleInvokeActionError(err: SagaError, step: SagaStep, stepIndex: number): Promise<boolean> {
    this.errors.push(err);

    if (step.skipRollback) {
      if (step.compensation && !this.compensatedSteps.includes(stepIndex)) {
        try {
          await step.compensation(this.ctx, this.errors, this.history);
        } catch (compErr: any) {
          this.errors.push(compErr?.message);
        }
        this.compensatedSteps.push(stepIndex);
      }
      return true;
    } else {
      if (step.compensation && !this.compensatedSteps.includes(stepIndex)) {
        try {
          await step.compensation(this.ctx, this.errors, this.history);
        } catch (compErr: any) {
          this.errors.push(compErr?.message);
        }
        this.compensatedSteps.push(stepIndex);
      }
      await this.compensate(stepIndex);
      return false;
    }
  }

  private async handleVerificationFailure(
    step: SagaStep,
    stepIndex: number,
    label: string,
    generalMessage?: string,
  ): Promise<boolean> {
    const errorMsg = generalMessage
      ? `${generalMessage}:`
      : `SAGA_VERIFICATION_FAIL: Verification ${label} in step ${step.name} failed`;

    if (step.skipRollback) {
      this.errors.push(errorMsg + ' but skipped.');

      if (step.compensation && !this.compensatedSteps.includes(stepIndex)) {
        try {
          await step.compensation(this.ctx, this.errors, this.history);
        } catch (err: any) {
          this.errors.push(err?.message);
        }
        this.compensatedSteps.push(stepIndex);
      }

      return true;
    } else {
      this.errors.push(errorMsg);
      await this.compensate(stepIndex);
      return false;
    }
  }

  private async compensate(untilStep?: number) {
    for (let i = this.invokedSteps.length - 1; i >= 0; i--) {
      const stepIndex = this.invokedSteps[i];
      if (untilStep !== undefined && stepIndex > untilStep) {
        continue;
      }

      if (this.compensatedSteps.includes(stepIndex)) {
        continue; // No compensar un paso que ya ha sido compensado
      }

      const step = this.steps[stepIndex];

      // Compensar a nivel de invoke
      for (const invoke of step.invokes) {
        if (invoke.compensation) {
          try {
            await invoke.compensation(this.ctx, this.errors, this.history);
          } catch (err: any) {
            this.errors.push(err.message);
          }
        }
      }

      // Compensar a nivel de step
      if (step.compensation) {
        try {
          await step.compensation(this.ctx, this.errors, this.history);
          this.compensatedSteps.push(stepIndex);
        } catch (err: any) {
          this.errors.push(err.message);
        }
      }
    }
  }

  private formatResponse(): SagaResponse<T> {
    return {
      state: this.errors.length > 0 ? 'failed' : 'success',
      context: this.ctx,
      errors: this.errors,
      history: this.history, // You can populate this as needed
    };
  }
}

export class SagaBuilder {
  index: number | null = null;
  steps: Workflow = [];
  invokeCount = 0; // Este contador ayudará a generar nombres únicos para las funciones anónimas.

  step(name: string): SagaBuilder {
    const step: SagaStep = {
      name,
      invokes: [],
    };
    this.steps.push(step);
    this.index = this.steps.length - 1; // <-- Establecer el índice al último elemento añadido
    return this;
  }

  invoke(nameOrFunction: string | Invoke, fn?: Invoke): SagaBuilder {
    let realFn: Invoke;
    let realName: string;

    if (typeof nameOrFunction === 'string') {
      realName = nameOrFunction;
      realFn = fn!;
    } else {
      this.invokeCount++;
      realName = `Anonymous invoke ${this.invokeCount}`;
      realFn = nameOrFunction;
    }

    const step = this.steps[this.index!];

    // Transform function into InvokeAction
    step.invokes.push({
      name: realName,
      condition: null,
      action: realFn,
      compensation: null,
    });

    return this;
  }

  compensation(fn: (ctx: Context, errors: string[], history: any[]) => void | Promise<void>): SagaBuilder {
    if (!this.steps.length) {
      throw new Error('Please define a step before adding compensation.');
    }

    const currentStep: SagaStep = this.steps[this.steps.length - 1];
    currentStep.compensation = fn;
    return this;
  }

  condition(fn: (ctx: Context) => boolean): SagaBuilder {
    if (!this.steps.length) {
      throw new Error('Please define a step before adding a condition.');
    }

    const currentStep: SagaStep = this.steps[this.steps.length - 1];
    currentStep.condition?.push(fn);
    return this;
  }

  verify(label: string, fn: (ctx: Context) => boolean, generalMessage?: string): SagaBuilder {
    if (!this.steps.length) {
      throw new Error('Please define a step before adding a verification.');
    }

    const currentStep: SagaStep = this.steps[this.steps.length - 1];
    if (!currentStep.verify) {
      currentStep.verify = new Array<Verify>();
    }

    currentStep.verify.push({ label, fn, generalMessage });
    return this;
  }

  skipRollback(): SagaBuilder {
    if (!this.steps.length) {
      throw new Error('Please define a step before using skipRollback.');
    }

    const currentStep = this.steps[this.steps.length - 1];
    currentStep.skipRollback = true;
    return this;
  }

  build(): Workflow {
    return this.steps;
  }
}

export class SagaFactory<T extends Context> {
  private builder: SagaBuilder;
  private initialContext: T;

  constructor(initialContext: T) {
    this.builder = new SagaBuilder();
    this.initialContext = initialContext;
  }

  step(name: string): SagaFactory<T> {
    this.builder.step(name);
    return this;
  }

  invoke(nameOrFunction: string | Invoke, fn?: Invoke): SagaFactory<T> {
    this.builder.invoke(nameOrFunction, fn);
    return this;
  }

  compensation(fn: (ctx: Context, errors: string[], history: any[]) => void | Promise<void>): SagaFactory<T> {
    this.builder.compensation(fn);
    return this;
  }

  condition(fn: (ctx: Context) => boolean): SagaFactory<T> {
    this.builder.condition(fn);
    return this;
  }

  verify(label: string, fn: (ctx: Context) => boolean, generalMessage?: string): SagaFactory<T> {
    this.builder.verify(label, fn, generalMessage);
    return this;
  }

  skipRollback(): SagaFactory<T> {
    this.builder.skipRollback();
    return this;
  }

  async execute(): Promise<SagaResponse<T>> {
    const processor = new SagaProcessor<T>(this.initialContext);
    processor.add(this.builder.build());
    return await processor.start();
  }
}
