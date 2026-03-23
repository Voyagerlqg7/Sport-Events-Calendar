import { Extension } from '../domain.exceptions';
import { DomainExceptionCode } from '../domain.exception.codes';

export interface ErrorResponseBody {
  timestamp: string;
  path: string | null;
  message: string;
  extensions: Extension[];
  code: DomainExceptionCode;
  stack?: string;
  error?: string;
  statusCode?: number;
}
