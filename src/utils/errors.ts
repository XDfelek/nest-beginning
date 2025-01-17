import {
  ForbiddenException,
  HttpStatus,
  NotFoundException,
} from '@nestjs/common';

export type BaseError = {
  message: string;
};

export type ApiError = {
  code: HttpStatus;
} & BaseError;

export const ThrowError = (apiError: ApiError) => {
  if (apiError.code == HttpStatus.NOT_FOUND) {
    throw new NotFoundException(apiError.message);
  }
  if (apiError.code == HttpStatus.FORBIDDEN) {
    throw new ForbiddenException(apiError.message);
  }
};
