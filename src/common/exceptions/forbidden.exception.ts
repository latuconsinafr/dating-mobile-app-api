/* istanbul ignore file */
import { HttpException, HttpStatus } from '@nestjs/common';
import { DEFAULT_FORBIDDEN_MESSAGE, DEFAULT_HELP_MESSAGE } from '../constants';
import { ErrorResponse } from '../dto/responses/error-response.dto';
import { ErrorCode } from '../enums/http/error-code.enum';

/**
 * Defines an HTTP exception for *Forbidden* type errors.
 *
 * @see [Built-in HTTP exceptions](https://docs.nestjs.com/exception-filters#built-in-http-exceptions)
 */
export class ForbiddenException extends HttpException {
  /**
   * Instantiate an `ForbiddenException` Exception.
   *
   * @example
   * `throw new ForbiddenException()`
   *
   * @usageNotes
   * The HTTP response status code will be 403.
   * - The `errorResponse` argument defines the JSON response body.
   *
   * By default, the JSON response body contains three properties:
   * - `message`: the string {@link DEFAULT_FORBIDDEN_MESSAGE} by default;
   * override this by supplying a string in the errorResponse parameter.
   * - `error`: the enum {@link ErrorCode.ERROR_FORBIDDEN} by default;
   * override this by supplying any value of `ErrorCode` in the errorResponse parameter.
   * - `help`: the string {@link DEFAULT_HELP_MESSAGE} by default;
   * override this by supplying a string in the errorResponse parameter.
   *
   * @param errorResponse Object describing the error condition, if any
   */
  constructor(errorResponse?: Partial<ErrorResponse>) {
    const httpStatus = HttpStatus.FORBIDDEN;
    const response: ErrorResponse = new ErrorResponse({
      message: errorResponse?.message ?? DEFAULT_FORBIDDEN_MESSAGE,
      error: errorResponse?.error ?? ErrorCode.ERROR_FORBIDDEN,
      help: errorResponse?.help ?? DEFAULT_HELP_MESSAGE,
    });

    super(
      HttpException.createBody(response, response.error, httpStatus),
      httpStatus,
    );
  }
}
