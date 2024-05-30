import { Catch, HttpException, HttpStatus } from '@nestjs/common';
import { GqlExceptionFilter } from '@nestjs/graphql';

const errorPatterns = [
  {
    keywords: ['ATTRIBUTE_MISSING_IN_RETRIEVED_DATA'],
    generalMessage: 'ATTRIBUTE_MISSING_IN_RETRIEVED_DATA',
    specificMessage: 'An essential attribute is missing in the data we retrieved from our records',
    statusCode: 490,
    frontEndIssue: false,
    backEndIssue: true,
  },
  {
    keywords: ['INCOMPATBLE_TYPE_IN_RETRIEVED_DATA'],
    generalMessage: 'INCOMPATBLE_TYPE_IN_RETRIEVED_DATA',
    specificMessage: "Data retrieved from our records doesn't match the expected type",
    statusCode: 490,
    frontEndIssue: false,
    backEndIssue: true,
  },
  {
    keywords: ['COMPENSATE_ERROR'],
    generalMessage: 'COMPENSATE_ERROR',
    specificMessage: 'An error occurred during the compensation phase of the saga workflow',
    statusCode: 490,
    frontEndIssue: false,
    backEndIssue: true,
  },
  {
    keywords: ['DATA_VALIDATION'],
    generalMessage: 'DATA_VALIDATION',
    specificMessage: 'The data we received is not valid',
    statusCode: 490,
    frontEndIssue: true,
    backEndIssue: false,
  },
  {
    keywords: ['INTEGRITY_ERROR'],
    generalMessage: 'INTEGRITY_ERROR',
    specificMessage: 'An integrity error occurred',
    statusCode: 490,
    frontEndIssue: false,
    backEndIssue: true,
  },
  {
    keywords: ['MICROSERVICE_NOT_FOUND'],
    generalMessage: 'INTERNAL SERVER ERROR',
    specificMessage: 'The server experienced an issue processing your request',
    statusCode: 490,
    frontEndIssue: false,
    backEndIssue: true,
  },
  {
    keywords: ['INVALID_PARAMETERS'],
    generalMessage: 'BAD REQUEST',
    statusCode: 400,
    frontEndIssue: true,
    backEndIssue: false,
  },
  {
    keywords: ['SAGA_VERIFICATION_FAIL'],
    generalMessage: 'SAGA_VERIFICATION_FAIL',
    specificMessage: 'An error occurred during the verification phase of the saga workflow',
    statusCode: 409,
    frontEndIssue: false,
    backEndIssue: false,
  },
  {
    keywords: ['AUTH_FAIL'],
    generalMessage: 'AUTH_FAIL',
    specificMessage: 'The password or username you entered is incorrect',
    statusCode: 401,
    frontEndIssue: true,
    backEndIssue: false,
  },
];

const defaultErrorMessage = {
  generalMessage: 'INTERNAL SERVER ERROR',
  specificMessage: 'The server experienced an issue processing your request',
  statusCode: HttpStatus.INTERNAL_SERVER_ERROR,
};

function searchErrorPatterns(response: string, defaultStatus: number) {
  let generated = {
    generalMessage: [],
    specificMessage: [],
    statusCode: [],
  };

  const messageMap = {
    frontEnd: 'Please note that this is a font-end issue an not back-end problem.',
    backEnd: 'Please note that this is a back-end issue an not font-end problem.',
    frontEndAndBackEnd: 'Please note that this is a font-end and back-end issue.',
    default: 'The server experienced an issue processing your request.',
  };

  for (const pattern of errorPatterns) {
    if (pattern.keywords.some((keyword) => response.includes(keyword))) {
      const backEndOrFrontEnd = pattern.frontEndIssue
        ? 'frontEnd'
        : pattern.backEndIssue
        ? 'backEnd'
        : pattern.frontEndIssue && pattern.backEndIssue
        ? 'frontEndAndBackEnd'
        : 'default';

      generated.generalMessage.push(pattern.generalMessage);
      generated.specificMessage.push(
        `${response.replaceAll(`${pattern.generalMessage}:`, '')}${pattern.specificMessage}, ${
          messageMap[backEndOrFrontEnd]
        }`,
      );
      generated.statusCode.push(pattern.statusCode);
    }
  }

  return {
    generalMessage: generated.generalMessage[0] || defaultErrorMessage.generalMessage,
    specificMessage: generated.specificMessage[0] || defaultErrorMessage.specificMessage,
    statusCode: generated.statusCode[0] || [defaultErrorMessage.statusCode],
  };
}

@Catch()
export class ApiExceptionsFilter implements GqlExceptionFilter {
  catch(exception: unknown) {
    const defaultStatus = exception instanceof HttpException ? exception.getStatus() : HttpStatus.INTERNAL_SERVER_ERROR;

    const { generalMessage, specificMessage, statusCode } = this.customError(exception, defaultStatus);

    return new HttpException(
      {
        message: generalMessage,
        statusCode: statusCode,
        timestamp: new Date().toISOString(),
        specificMessage: specificMessage,
      },
      statusCode[0],
    );
  }

  private customError(exception: any, defaultStatus: number) {
    const response = exception.message;

    if (Object.keys(response).length === 0) {
      console.error(`UNDEFINED ERROR: ${exception}`);
    } else {
      console.error(`${response}`);
    }

    return searchErrorPatterns(response, defaultStatus);
  }
}
