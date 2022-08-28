export class HttpError extends Error {
  constructor(message, statusCode, data) {
    super(message);

    this.statusCode = statusCode;
    this.name = 'HttpError';
    this.data = data;
  }
}