// src/common/errors/already-exists-error.ts
import { CustomError } from './custom.errors';

export class AlreadyExistsError extends CustomError {
  constructor(resource = 'Maʼlumot') {
    super(`${resource} allaqachon mavjud`, 409, 'ALREADY_EXISTS');
  }
}
