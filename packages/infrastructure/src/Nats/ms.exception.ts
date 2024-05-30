export class MsExceptions extends Error {
  readonly message!: string;
  readonly pattern: string;
  readonly payload: any;
  readonly response: any;

  constructor(pattern: string, message: string, payload: any, response: any) {
    super(message);
    this.pattern = pattern;
    this.payload = payload;
    this.response = response;
  }
}
