import { HttpException, HttpStatus } from '@nestjs/common';
import {
  DEFAULT_HELP_MESSAGE,
  DEFAULT_INTERNAL_SERVER_ERROR_MESSAGE,
} from '../constants';
import { ErrorResponse } from '../dto/responses/error-response.dto';
import { ErrorCode } from '../enums/http/error-code.enum';

/**
 * Defines an HTTP exception for *Internal Server Error* type errors.
 *
 * @see [Built-in HTTP exceptions](https://docs.nestjs.com/exception-filters#built-in-http-exceptions)
 */
export class InternalServerErrorException extends HttpException {
  /**
   * Instantiate an `InternalServerErrorException` Exception.
   *
   * @example
   * `throw new InternalServerErrorException()`
   *
   * @usageNotes
   * The HTTP response status code will be 500.
   * - The `errorResponse` argument defines the JSON response body.
   *
   * By default, the JSON response body contains three properties:
   * - `message`: the string {@link DEFAULT_INTERNAL_SERVER_ERROR_MESSAGE} by default;
   * override this by supplying a string in the errorResponse parameter.
   * - `error`: the enum {@link ErrorCode.ERROR_INTERNAL_SERVER_ERROR} by default;
   * override this by supplying any value of `ErrorCode` in the errorResponse parameter.
   * - `help`: the string {@link DEFAULT_HELP_MESSAGE} by default;
   * override this by supplying a string in the errorResponse parameter.
   *
   * @param errorResponse Object describing the error condition, if any
   */
  constructor(errorResponse?: Partial<ErrorResponse>) {
    const httpStatus = HttpStatus.INTERNAL_SERVER_ERROR;
    const response: ErrorResponse = new ErrorResponse({
      message: errorResponse?.message ?? DEFAULT_INTERNAL_SERVER_ERROR_MESSAGE,
      error: errorResponse?.error ?? ErrorCode.ERROR_INTERNAL_SERVER_ERROR,
      help: errorResponse?.help ?? DEFAULT_HELP_MESSAGE,
    });

    super(
      HttpException.createBody(response, response.error, httpStatus),
      httpStatus,
    );
  }
}
