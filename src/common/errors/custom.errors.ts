export class CustomError extends Error {
  constructor(
    public message: string,
    public statusCode: number = 400,
    public errorCode: string = 'CUSTOM_ERROR',
  ) {
    super(message);
    this.name = new.target.name;
    Error.captureStackTrace(this, this.constructor);
  }
}
