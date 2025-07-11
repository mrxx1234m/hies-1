import {
    ExceptionFilter,
    Catch,
    ArgumentsHost,
    HttpException,
    HttpStatus,
  } from '@nestjs/common';
  import { Request, Response } from 'express';
  import { CustomError } from '../errors/custom.errors';
  
  @Catch()
  export class AllExceptionsFilter implements ExceptionFilter {
    catch(exception: unknown, host: ArgumentsHost) {
      const ctx = host.switchToHttp();
      const response = ctx.getResponse<Response>();
      const request = ctx.getRequest<Request>();
  
      let status = HttpStatus.INTERNAL_SERVER_ERROR;
      let message = 'Internal server error';
      let errorCode = 'INTERNAL_ERROR';
  
      if (exception instanceof CustomError) {
        status = exception.statusCode;
        message = exception.message;
        errorCode = exception.errorCode;
      } else if (exception instanceof HttpException) {
        status = exception.getStatus();
        const res: any = exception.getResponse();
        message = res.message || exception.message;
      } else if (exception instanceof Error) {
        message = exception.message;
      }
  
      response.status(status).json({
        success: false,
        message,
        errorCode,
        timestamp: new Date().toISOString(),
        path: request.url,
      });

    }
  }
  
  